"""
    solve(prob::FODESystem, h, AtanganaSedaAB())

Solve Atangana-Baleanu fractional order differential equations using Newton Polynomials.
"""
struct AtanganaSedaAB <: FODESystemAlgorithm end

function solve(prob::FODESystem, h, ::AtanganaSedaAB)
    @unpack f, α, u0, tspan, p = prob
    α = α[1]
    t0 = tspan[1]; tfinal = tspan[2]
    t = collect(t0:h:tfinal)
    N::Int = ceil(Int, (tfinal-t0)/h)
    AB = 1-α+α/gamma(α)
    t = collect(Float64, t0:h:tfinal)

    l = length(u0)
    # Initialization
    result = zeros(Float64, l, N+1)
    result[:, 1] = u0


    # Calculuate the first two value to start the computing
    tmp1=zeros(Float64, l); tmp2=zeros(Float64, l)
    f(tmp1, u0, p, t[1])
    result[:, 2] = u0+h.*tmp1
    f(tmp2, result[:, 2], p, t[2])
    result[:, 3] = result[:, 2]+(h/2).*(3*tmp2-tmp1)

    for n=3:N
        temp1 = zeros(l)
        temp2 = zeros(l)
        temp3 = zeros(l)

        temptemp1, temptemp2, temptemp3 = zeros(l), zeros(l), zeros(l)
        f(temp1, result[:, n-1], p, t[n-1])
        for j=3:n
            f(temp1, result[:, j-2], p, t[j-2])
            temptemp1 += ((n+1-j)^α-(n-j)^α)*temp1
            f(temp2, result[:, j-1], p, t[j-1])
            temptemp2 += (temp2-temp1)*((n+1-j)^α*(n-j+3+2*α)-(n-j)^α*(n-j+3+3*α))
            f(temp3, result[:, j], p, t[j])
            temptemp3 += (temp3-2*temp2+temp1)*((n-j+1)^α*(2*(n-j)^2+(3*α+10)*(n-j)+2*(α)^2+9*α+12)-(n-j)^α*(2*(n-j)^2+(5*α+10)*(n-j)+6*α^2+18*α+12))
        end
        temptemptemp = zeros(l)
        f(temptemptemp, result[:, n], p, t[n])

        result[:, n+1] = u0+(1-α)/AB*temptemptemp+((h^α)*α/(AB*gamma(α+1)))*temptemp1 + ((h^α)*α/(AB*gamma(α+2)))*temptemp2+((h^α)*α/(2*AB*gamma(α+3)))*temptemp3
    end
    return FODESystemSolution(t, result)
end


"""
    solve(prob::FODESystem, h, AtanganaSedaCF())

Atagana Seda method for Caputo-Fabrizio fractional order differential equations.

!!! tip
    Used for the Caputo Fabrizio fractional differential operators.

```tex
https://doi.org/10.1016/c2020-0-02711-8
```
"""
struct AtanganaSedaCF <: FODESystemAlgorithm end
#FIXME: Tests
function solve(prob::FODESystem, h, ::AtanganaSedaCF)
    @unpack f, α, u0, tspan, p = prob
    t0 = tspan[1]; tfinal = tspan[2]
    t=collect(Float64, t0:h:tfinal)
    α=α[1]
    M=1-α+α/gamma(α)
    N=ceil(Int, (tfinal-t0)/h)
    l=length(u0)
    result = zeros(l, N+1)
    temp1 = zeros(l); temp2 = zeros(l)
    f(temp1, u0, p, t[1])
    result[:, 2] = u0+temp1
    f(temp2, result[:, 2], p, t[2])
    result[:, 3] = result[:, 2] + (h/2)*(3*temp2-temp1)
    tempn, tempn1, tempn2 = zeros(l), zeros(l), zeros(l)
    for n=3:N
        f(tempn, result[:, n], p, t[n])
        f(tempn1, result[:, n-1], p, t[n-1])

        f(tempn2, result[:, n-2], p, t[n-2])
        result[:, n+1] = result[:, n] + (1-α)/M*(tempn-tempn1)+α*M*h*(23/12*tempn-4/3*tempn1+5/12*tempn2)
    end
    return FODESystemSolution(t, result)
end