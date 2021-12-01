using SpecialFunctions

"""
Base type of FractionalDiffEq algorithms
"""
abstract type FractionalDiffEqAlgorithm end


"""
Predict-Evaluate-Correct-Evaluate algorithm.

For more details, please refer to [Predictor-Corrector algorithms](https://en.wikipedia.org/wiki/Predictor%E2%80%93corrector_method)

This PECE algorithm is taken from Diethelm's paper.

```tex
@article{
title={A predictor-corrector approach for the numerical solution of fractional differential equations},
author={Diethelm, Kai and Ford, Neville J. and Freed, Alan D.}
doi={https://doi.org/10.1023/A:1016592219341}
}
```
"""
struct PECE <: FractionalDiffEqAlgorithm end
#TODO: Use Richardson extrapolation to refine the PECE algorithms 


"""
    FDEProblem(f, α, u0, T, h)

Define a Fractional Differential in time interval [0, T] with initial value y(0)=u₀, α-order derivative and step size h.
"""
abstract type FDEProblem end

"""

    FODEProblem(f, α, u0, T, h)

Fractional Ordinary Differential Equations definition
"""
struct FODEProblem <: FDEProblem
    f
    α
    u0
    T
    h
end

"""

    FPDEProblem()

"""
struct FPDEProblem <: FDEProblem
    α
    β
    T
    M
    N
end


"""
    solve(FODEProblem, PECE())

After define the FDEProblem, use **PECE(Predict-Evaluate-Correct-Evaluate) algorithm** to computing the Fractional Differential Equation
"""
function solve(FODE::FODEProblem, ::PECE)
    f, α, u0, T, h = FODE.f, FODE.α, FODE.u0, FODE.T, FODE.h
    N=Int64(T/h)
    y=zeros(N+1)
    leftsum = 0

    if floor(α)==0
        leftsum=u0
    elseif floor(α)==1
        leftsum=u0+T*u0
    end

    @fastmath @inbounds @simd for n in range(0, N, step=1)
        y[Int64(n+1)]=leftsum + h^α/gamma(α+2)*f((n+1)*h, predictor(f, y, α, n, h, u0, T))+h^α/gamma(α+2)*right(f, y, α, n, h)
    end

    return y
end

function right(f, y, α, n, h)
    temp = 0

    @fastmath @inbounds @simd for j in range(0, n, step=1)
        temp+=A(j, n, α)*f(j*h, y[Int64(j+1)])
    end

    return temp
end

function predictor(f, y, α, n, h, u0, T)
     predict = 0
     leftsum = 0

     if floor(α)==0
        leftsum=u0
     elseif floor(α)==1
        leftsum=u0+T*u0
     end

     @fastmath @inbounds @simd for j in range(0, n, step=1)
        predict+=B(j, n, α, h)*f(j*h, y[Int64(j+1)])
     end

     #return u0+predict
     return leftsum+predict
end


function A(j, n, α)
    if j==0
        return n^(α+1)-(n-α)*(n+1)^α
    elseif 1 ≤ j ≤ n
        return (n-j+2)^(α+1)+(n-j)^(α+1)-2*(n-j+1)^(α+1)
    elseif j==n+1
        return 1
    end
end

function B(j, n, α, h)
    return h^α/α*((n+1-j)^α-(n-j)^α)
end