function Base.show(io::IO, sol::FODESolution)
    show(io::IO, typeof(sol.t))
    show(stdout, MIME("text/plain"), sol.t)
    println()
    show(io::IO, typeof(sol.u))
    show(stdout, MIME("text/plain"), sol.u)
end

"""
Fractional ordinary differential equations solutions visulization.
"""
@recipe f(sol::FODESolution) = sol.t, sol.u