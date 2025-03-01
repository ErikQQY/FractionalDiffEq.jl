"""
# Usage

    solve(prob::SingleTermFODEProblem, h, PECE())

Predict-Evaluate-Correct-Evaluate algorithm.

For more details, please refer to [Predictor-Corrector algorithms](https://en.wikipedia.org/wiki/Predictor%E2%80%93corrector_method)

This PECE algorithm is taken from Diethelm's paper.

### References

```tex
@article{
title={A predictor-corrector approach for the numerical solution of fractional differential equations},
author={Diethelm, Kai and Ford, Neville J. and Freed, Alan D.}
doi={https://doi.org/10.1023/A:1016592219341}
}
```
"""
struct PECE <: SingleTermFODEAlgorithm end
#TODO: Use Richardson extrapolation to refine the PECE algorithms 
#TODO: Rename as ABM

"""
    solve(problem::SingleTermFODEProblem, h, PECE())

Generalproblem solving API for solving FDE problems.
"""
function solve(FODE::SingleTermFODEProblem, h::Float64, ::PECE)
    @unpack f, α, u0, tspan, p = FODE
    fun(t, u) = f(u, p, t)
    t0 = tspan[1]; T = tspan[2]
    N::Int64 = round(Int, (T-t0)/h)
    y = zeros(Float64, N+1) # Initialize the solution array


    @fastmath @inbounds @simd for n ∈ 0:N
        # Handling initial value
        temp = zero(Float64)
        for k in 0:ceil(Int, α)-1
            temp += u0[k+1]*(t0+(n+1)*h)^k/factorial(k)
        end
        y[n+1] = temp + h^α/gamma(α+2)*(fun(t0+(n+1)*h, predictor(fun, y, α, n, h, u0, t0)) + right(fun, y, α, n, h))
    end

    tspan = collect(Float64, t0:h:T)
    return FODESolution(tspan, y)
end

function right(fun::Function, y, α::Float64, n::Int64, h::Float64)
    temp = zero(Float64)

    @fastmath @inbounds @simd for j = 0:n
        temp += A(j, n, α)*fun(j*h, y[j+1])
    end

    return temp
end

function predictor(fun::Function, y, α::Float64, n::Integer, h::Float64, u0::Union{Number, AbstractArray}, t0::Number)
    predict = zero(Float64)
    leftsum = zero(Float64)

    l::Int = ceil(Int, α)

    # Handling initial value
    @fastmath @inbounds @simd for k in 0:l-1
        leftsum += u0[k+1]*(t0+(n+1)*h)^k/factorial(k)
    end

    @fastmath @inbounds @simd for j in 0:n
        predict += B(j, n, α)*fun(j*h, y[j+1])
    end

    return leftsum + h^α/α*predict
end


function A(j::Int64, n::Int64, α::Float64)
    if j == 0
        return n^(α+1) - (n-α)*(n+1)^α
    elseif 1 ≤ j ≤ n
        return (n-j+2)^(α+1) + (n-j)^(α+1) - 2*(n-j+1)^(α+1)
    elseif j == n+1
        return 1
    end
end

# Generalized binomials
B(j::Int64, n::Int64, α::Float64) = ((n + 1 - j)^α - (n - j)^α) # Moved the h^α/α to the end of predictor: return leftsum + h^α/α*predict
