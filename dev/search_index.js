var documenterSearchIndex = {"docs":
[{"location":"get_started/#Get-Start","page":"Get Started","title":"Get Start","text":"","category":"section"},{"location":"get_started/#What-is-Fractional-Differential-Equations?","page":"Get Started","title":"What is Fractional Differential Equations?","text":"","category":"section"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"While the Ordinary Differential Equations and Partial Differential Equations are widely used in enormous areas and play important roles in their theoretical analysis, someone may asks, ODE and PDE are enough for nowadays modeling, has FDE any usage in our life?","category":"page"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"Well, fractional differential equation can be seen as the generalization of ODE and PDE. In our daily life, models usually are better described in fractional differential equations.","category":"page"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"A special applying case for fractional differential equations is viscoelasty, which research the property of a subject with both Viscosity and Elasticity. ","category":"page"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"And also the CRONE controller and PI^lambda D^mu controller deploy fractional derivative to better describe system. ","category":"page"},{"location":"get_started/#A-simple-example-——-Relaxation-Oscillation-Equation","page":"Get Started","title":"A simple example —— Relaxation Oscillation Equation","text":"","category":"section"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"Let's see a simple model involving fractional differential equations: Relaxation Oscillation Process","category":"page"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"D^18y(t)+y(t)=1 (t0)","category":"page"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"y^(k)(0)=0","category":"page"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"We can solve the Relaxation Oscillation Equation using FractionalDiffEq.jl:","category":"page"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"using FractionalDiffEq, Plots, LaTeXStrings\n\ns=\"\\$D^{0.5}y(x)=1-y,\\\\ y(0)=0\\$\"\n\nfun(x, y) = 1-y\nprob=FODEProblem(fun, 0.5, 0, 5, 0.01)\nresult=solve(prob, PECE())\ntspan=collect(0:0.01:5)\n\nPlots.plot(tspan, result, title=s, linewidth=2, legend=:bottomright)","category":"page"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"By ploting the numerical result, we can get the approximation result:","category":"page"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"(Image: Relaxation Oscillation)","category":"page"},{"location":"get_started/#FDE-with-specific-initial-value","page":"Get Started","title":"FDE with specific initial value","text":"","category":"section"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"While the former examples we only use the zero initial value problem, here, we can look at some problems with non-zero examples.","category":"page"},{"location":"get_started/#Some-Algorithms-explanation:","page":"Get Started","title":"Some Algorithms explanation:","text":"","category":"section"},{"location":"get_started/","page":"Get Started","title":"Get Started","text":"As a matter of fact, to solve a fractional differential equations is to solve a volterra integral equation:","category":"page"},{"location":"system_of_FDE/#System-of-fractional-differential-equations","page":"System of FDE","title":"System of fractional differential equations","text":"","category":"section"},{"location":"system_of_FDE/","page":"System of FDE","title":"System of FDE","text":"Many \"real life\" situations are governed by a system of fractional differential equations.","category":"page"},{"location":"system_of_FDE/","page":"System of FDE","title":"System of FDE","text":"So here, we will look at an example: Chua circuit.","category":"page"},{"location":"system_of_FDE/","page":"System of FDE","title":"System of FDE","text":"The circuit diagram of the Chua system is shown below:","category":"page"},{"location":"system_of_FDE/","page":"System of FDE","title":"System of FDE","text":"(Image: Chua diode)","category":"page"},{"location":"system_of_FDE/","page":"System of FDE","title":"System of FDE","text":"Here, N_R is the memoristor, which is a non-linear electrical component relating electric charge and magnetic flux linkage.","category":"page"},{"location":"system_of_FDE/","page":"System of FDE","title":"System of FDE","text":"Let's see if we abstract the Chua system into a fractional differential equation system:","category":"page"},{"location":"system_of_FDE/","page":"System of FDE","title":"System of FDE","text":"begincases\nD^alpha_1x=10725y-17802x-01927(x+1-x-1)\nD^alpha_2y=x-y+z\nD^alpha_3z=-10593y-0268z\nendcases","category":"page"},{"location":"system_of_FDE/","page":"System of FDE","title":"System of FDE","text":"Use the NonLinearAlg algorithm in FractionalDiffEq.jl to solve the Chua system and plot the result:","category":"page"},{"location":"system_of_FDE/","page":"System of FDE","title":"System of FDE","text":"using FractionalDiffEq\nusing Plots\n\nfunction chua(t, x, k)\n    a = 10.725\n    b = 10.593\n    c = 0.268\n    m0 = -1.1726\n    m1 = -0.7872\n\n    if k == 1\n        f = m1*x[1]+0.5*(m0-m1)*(abs(x[1]+1)-abs(x[1]-1))\n        y = a*(x[2]-x[1]-f)\n        return y\n    elseif k == 2\n        y = x[1]-x[2]+x[3]\n        return y\n    elseif k == 3\n        y = -b*x[2]-c*x[3]\n        return y\n    end\nend\n\nalpha = [0.93, 0.99, 0.92];\nx0 = [0.2; -0.1; 0.1];\nh = 0.01;\ntn = 200;\nresult = solve(chua, alpha, x0, h, tn, NonLinearAlg())\n\ngr()\nplot(result[:, 1], result[:, 2], title=\"Chua System\", legend=:bottomright)","category":"page"},{"location":"system_of_FDE/","page":"System of FDE","title":"System of FDE","text":"(Image: Chua)","category":"page"},{"location":"system_of_FDE/","page":"System of FDE","title":"System of FDE","text":"Cheers!🎉🎉🎉","category":"page"},{"location":"auxiliary/#Auxiliary-functions-in-FractionalDiffEq.jl","page":"Auxiliary Functions","title":"Auxiliary functions in FractionalDiffEq.jl","text":"","category":"section"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"There are some build-in auxiliary functions in FractionalDiffEq.jl.","category":"page"},{"location":"auxiliary/#Mittag-Leffler-function","page":"Auxiliary Functions","title":"Mittag Leffler function","text":"","category":"section"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"The mittag leffler function is adapted from MittagLeffler.jl implemented by John Lapeyre. We build in the mittag leffler function and add a few more functionalities.","category":"page"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"The mittag leffler function is defined as:","category":"page"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"E_alpha beta(z)=sum_k=0^inftyfracz^kGamma(alpha k+beta)","category":"page"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"And single parameter version:","category":"page"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"E_alpha(z)=E_alpha 1(z)","category":"page"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"In FractionalDiffEq.jl, you can compute the mittag leffler function by calling:","category":"page"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"julia> mittleff(α, β, z)\njulia> mittleff(α, z)","category":"page"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"Different order single parameter plot(0alpha1):","category":"page"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"(Image: MittLeff)","category":"page"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"And also 1alpha2:","category":"page"},{"location":"auxiliary/","page":"Auxiliary Functions","title":"Auxiliary Functions","text":"(Image: MittagLeffler)","category":"page"},{"location":"APIs/","page":"FractionalDiffEq APIs","title":"FractionalDiffEq APIs","text":"CurrentModule = FractionalDiffEq\nDocTestSetup  = quote\n    using FractionalDiffEq\nend\nDocTestFilters = [r\"Stacktrace:[\\s\\S]+\"]","category":"page"},{"location":"APIs/#FractionalDiffEq.jl-APIs","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.jl APIs","text":"","category":"section"},{"location":"APIs/#Problem-definition:","page":"FractionalDiffEq APIs","title":"Problem definition:","text":"","category":"section"},{"location":"APIs/","page":"FractionalDiffEq APIs","title":"FractionalDiffEq APIs","text":"FractionalDiffEq.FDEProblem","category":"page"},{"location":"APIs/#FractionalDiffEq.FDEProblem","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.FDEProblem","text":"FDEProblem\n\nGeneral parent type for all kinds of problems in FractionalDiffEq.jl.\n\n\n\n\n\n","category":"type"},{"location":"APIs/#General-solve-API","page":"FractionalDiffEq APIs","title":"General solve API","text":"","category":"section"},{"location":"APIs/","page":"FractionalDiffEq APIs","title":"FractionalDiffEq APIs","text":"FractionalDiffEq.solve","category":"page"},{"location":"APIs/#FractionalDiffEq.solve","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.solve","text":"solve(FODEProblem, PECE())\n\nAfter define the FDEProblem, use PECE(Predict-Evaluate-Correct-Evaluate) algorithm to computing the Fractional Differential Equation\n\n\n\n\n\nsolve(equation, right, h, T, MatrixDiscrete())\n\nUsing the Matrix Discretization algorithm proposed by Prof Igor Podlubny to obtain the numerical solution.\n\nReferences\n\n@inproceedings{Podlubny1998FractionalDE,   title={Fractional differential equations},   author={Igor Podlubny},   year={1998} }\n\n\n\n\n\nsolve(α, β, T, M, N, FPDEMatrixDiscrete())\n\nWhen using the Martix \n\n\n\n\n\nsolve(parameters, order, lparameters, lorders, u, t)\n\nUse Closed-Form Hankel matrix solution to obtain numerical solution at zero initial condition.\n\n\n\n\n\nsolve(parameters, order, lparameters, lorders, u, t)\n\nUse Closed-Form solution to obtain numerical solution at zero initial condition.\n\n\n\n\n\n","category":"function"},{"location":"APIs/","page":"FractionalDiffEq APIs","title":"FractionalDiffEq APIs","text":"The general solving API solve can accept various kinds of inputs, including FDEProblem, FODEProblem and FPDEProblem","category":"page"},{"location":"APIs/#Current-algorithms:","page":"FractionalDiffEq APIs","title":"Current algorithms:","text":"","category":"section"},{"location":"APIs/#Base-type","page":"FractionalDiffEq APIs","title":"Base type","text":"","category":"section"},{"location":"APIs/","page":"FractionalDiffEq APIs","title":"FractionalDiffEq APIs","text":"FractionalDiffEq.FractionalDiffEqAlgorithm","category":"page"},{"location":"APIs/#FractionalDiffEq.FractionalDiffEqAlgorithm","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.FractionalDiffEqAlgorithm","text":"Base type of FractionalDiffEq algorithms\n\n\n\n\n\n","category":"type"},{"location":"APIs/#Problem-types","page":"FractionalDiffEq APIs","title":"Problem types","text":"","category":"section"},{"location":"APIs/","page":"FractionalDiffEq APIs","title":"FractionalDiffEq APIs","text":"FractionalDiffEq.SingleTermFODEProblem\nFractionalDiffEq.MultiTermsFODEProblem\nFractionalDiffEq.FPDEProblem","category":"page"},{"location":"APIs/#FractionalDiffEq.SingleTermFODEProblem","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.SingleTermFODEProblem","text":"SingleTermFODEProblem(f, α, h)\n\nDefine a single term fractional ordinary differential equation, there are only one term in this problem.\n\n\n\n\n\n","category":"type"},{"location":"APIs/#FractionalDiffEq.MultiTermsFODEProblem","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.MultiTermsFODEProblem","text":"MultiTermsFODEProblem(parameters, orders, rparameters, rorders)\n\nDefine a multi-terms fractional ordinary differential equation.\n\n\n\n\n\n","category":"type"},{"location":"APIs/#FractionalDiffEq.FPDEProblem","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.FPDEProblem","text":"FPDEProblem()\n\n\n\n\n\n","category":"type"},{"location":"APIs/#Detailed-types","page":"FractionalDiffEq APIs","title":"Detailed types","text":"","category":"section"},{"location":"APIs/","page":"FractionalDiffEq APIs","title":"FractionalDiffEq APIs","text":"FractionalDiffEq.PECE","category":"page"},{"location":"APIs/#FractionalDiffEq.PECE","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.PECE","text":"Predict-Evaluate-Correct-Evaluate algorithm.\n\nFor more details, please refer to Predictor-Corrector algorithms\n\nThis PECE algorithm is taken from Diethelm's paper.\n\n@article{\ntitle={A predictor-corrector approach for the numerical solution of fractional differential equations},\nauthor={Diethelm, Kai and Ford, Neville J. and Freed, Alan D.}\ndoi={https://doi.org/10.1023/A:1016592219341}\n}\n\n\n\n\n\n","category":"type"},{"location":"APIs/","page":"FractionalDiffEq APIs","title":"FractionalDiffEq APIs","text":"FractionalDiffEq.FODEMatrixDiscrete\nFractionalDiffEq.FPDEMatrixDiscrete","category":"page"},{"location":"APIs/#FractionalDiffEq.FODEMatrixDiscrete","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.FODEMatrixDiscrete","text":"Using triangular strip matrices to discrete fractional ordinary differential equations to simple algebra system and solve the system.\n\n@inproceedings{Podlubny2000MATRIXAT,   title={MATRIX APPROACH TO DISCRETE FRACTIONAL CALCULUS},   author={Igor Podlubny},   year={2000} }\n\n\n\n\n\n","category":"type"},{"location":"APIs/#FractionalDiffEq.FPDEMatrixDiscrete","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.FPDEMatrixDiscrete","text":"Using triangular strip matrices to discrete fractional partial differential equations to simple algebra system and solve the system.\n\n@article{2009,    title={Matrix approach to discrete fractional calculus II: Partial fractional differential equations},    DOI={10.1016/j.jcp.2009.01.014},    author={Podlubny, Igor and Chechkin, Aleksei and Skovranek, Tomas and Chen, YangQuan and Vinagre Jara, Blas M.}, }\n\n\n\n\n\n","category":"type"},{"location":"APIs/#Some-models","page":"FractionalDiffEq APIs","title":"Some models","text":"","category":"section"},{"location":"APIs/","page":"FractionalDiffEq APIs","title":"FractionalDiffEq APIs","text":"FractionalDiffEq.bagleytorvik","category":"page"},{"location":"APIs/#FractionalDiffEq.bagleytorvik","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.bagleytorvik","text":"bagleytorvik(p1, p2, p3, T, h)\n\nBy specifying the parameters of Bagley Torvik Equation, we can use bagleytorvik to directly obtain the numerical approximation of a bagley torvik equation.\n\ninfo: p2 ≠ 0\nPlease note that the parameter of fractional derivative part must not be 0\n\n\n\n\n\n","category":"function"},{"location":"APIs/","page":"FractionalDiffEq APIs","title":"FractionalDiffEq APIs","text":"FractionalDiffEq.diffusion","category":"page"},{"location":"APIs/#FractionalDiffEq.diffusion","page":"FractionalDiffEq APIs","title":"FractionalDiffEq.diffusion","text":"diffusion(α, β)\n\nDiffusion equation with time fractional derivative.\n\nα and β are the coefficients of the time derivative and spatial derivative.\n\n\n\n\n\n","category":"function"},{"location":"multiterm/#Multi-term-FDE","page":"Multi-term FDE","title":"Multi term FDE","text":"","category":"section"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"By specifying different order in the equation, we can handle multi-term differential equations now!","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"Let's see if we have an initial value problem with multiple terms derivative containing both fractional and integer, we can use the FODEMatrixDiscrete algorithm to solve the equation.","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"All we have to do is use the general derivative representing function D(size, order, step) to represent different derivative, for example, D(30, 2, 0.01) represent the second order derivative y(t) term and D(30, 2.5, 0.01) represent the 2.5 order derivative D^25y(t) term.","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"warning: Keep the parameter unanimous\nWhen we are using D to represent different order deriavtives, please note we should keep the first parameter and third parameter unanimous, which represent the size of the discrete matrix and step size.","category":"page"},{"location":"multiterm/#Detailed-Usage","page":"Multi-term FDE","title":"Detailed Usage","text":"","category":"section"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"Let's see if we have an equation like:","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"2y(t)+4D^15y(t)=1","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"To solve this equation, you can use the code:","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"equation = 2*D(30, 2, 0.01) + 4*D(30, 1.5, 0.01)\nrightside = 1\nsolve(equation, rightside, 2, 30, 0.01)","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"Bingo! the result would represent the numerical solution of this equation!!!!","category":"page"},{"location":"multiterm/#Example","page":"Multi-term FDE","title":"Example","text":"","category":"section"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"We have an initla problem:","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"y(t)+frac116 ^C_0D^25_ty(t)+frac45y(t)+frac32y(t)+frac125^C_0D^05_ty(t)+frac65y(t)=frac172125cos(frac4t5)","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"y(0)=0 y(0)=0 y(0)=0","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"Model this problem and solve the equation:","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"using FractionalDiffEq\nusing Plots, LaTeXStrings\n\ns=\"\\$ A\\\\ complicated\\\\ example \\$\"\n\nT=30\nh=0.05\ntspan = collect(0.05:h:T)\n\nequation = D(600, 3, h)+1/16*D(600, 2.5, h)+4/5*D(600, 2, h)+3/2*D(600, 1, h)+1/25*D(600, 0.5, h)+6/5*D(600, 1, h);\nrightfun(x)=172/125*cos(4/5*x)\nresult=solve(equation, rightfun, 3, h, T)\n\nplot(tspan, result, title=s, legend=:bottomright)","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"By solving the equation and plotting the result, we can see its solution here:","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"(Image: Solution)","category":"page"},{"location":"multiterm/","page":"Multi-term FDE","title":"Multi-term FDE","text":"info: Example in GitHub\nThis example is an official example in the source code, please see the example folder","category":"page"},{"location":"models/#Detailed-Models","page":"Detailed Models","title":"Detailed Models","text":"","category":"section"},{"location":"models/#Diffusion-equation.","page":"Detailed Models","title":"Diffusion equation.","text":"","category":"section"},{"location":"models/#Diffusion-equation","page":"Detailed Models","title":"Diffusion equation","text":"","category":"section"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"Diffusion equation is a classical partial equation widely used in Physics to describe density fluctuations in a material undergonig diffusion.","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"fracpartial upartial t=nablacdot(kappa nabla u)","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"Here, kappa is the diffusion coefficient which is spatially-dependent. When kappa is a constant, Diffusion equation evolves to Heat equation:","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"fracpartial upartial t=kappanabla^2u","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"The Diffusion Equation belongs to Partial Differential Equations, and there are many amazing organizations and packages are dedicate to solve Partial Differential equations using high performance and advancing algorithms:","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"See Survey of PDE Packages","category":"page"},{"location":"models/#Differential-Equations-with-spatial-fractional-derivative","page":"Detailed Models","title":"Differential Equations with spatial fractional derivative","text":"","category":"section"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"When we modeling our problems, spatial fractional derivative maybe more suitable for our model, which change the diffusion equation to Diffusion equation with spatial fractional derivative","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"fracpartial upartial t-fracpartial^beta upartial x^beta=f(t u)","category":"page"},{"location":"models/#Diffusion-Equations-with-time-fractional-derivative","page":"Detailed Models","title":"Diffusion Equations with time fractional derivative","text":"","category":"section"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"When we modeling our problems, time fractional derivative maybe more suitable for our model, which change the diffusion equation to Diffusion equation with time fractional derivative","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"^C_0D^alpha_tu=fracpartial^2upartial x^2","category":"page"},{"location":"models/#General-fractional-diffusion-equation","page":"Detailed Models","title":"General fractional diffusion equation","text":"","category":"section"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"Well, time fractional derivative and spatial fractional derivative are both need to take into consideration:","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"^C_0D^alpha_tu-fracpartial^beta upartialx^beta=f(t u)","category":"page"},{"location":"models/#Bagley-Torvik-Equation","page":"Detailed Models","title":"Bagley Torvik Equation","text":"","category":"section"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"The Bagley Torvik can be used to describe the moving of damped object.","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"<img src=\"./assets/damped.png\" height=\"400px\" width=\"300px\"></img>","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"Ay(t)+BD^frac32_ty(t)+Cy(t)=f(t)","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"In FractionalDiffEq.jl, we can specify the parameters and solve the equation:","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"using FractionalDiffEq\nusing Plots, LaTeXStrings\n\ns=\"\\$Bagley\\\\ Torvik\\\\ Equation\\$\"\n\nT=30\nh=0.05\ntspan = collect(0:h:T)\nresult = bagleytorvik(1, 1, 1, 1, T, h)\n\nplot(tspan, result, title=s, legend=:bottomright)","category":"page"},{"location":"models/#Relaxation-Oscillation-Equation","page":"Detailed Models","title":"Relaxation Oscillation Equation","text":"","category":"section"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"(Image: Relaxo)","category":"page"},{"location":"models/","page":"Detailed Models","title":"Detailed Models","text":"https://en.wikipedia.org/wiki/Relaxation_oscillator","category":"page"},{"location":"comparison/#Comparison-with-other-toolboxes","page":"Comparison","title":"Comparison with other toolboxes","text":"","category":"section"},{"location":"comparison/","page":"Comparison","title":"Comparison","text":"There are also some toolboxes can be used for fractional differential equations, here, we make a survey of all these toolboxes and have a more intuitive perspective.","category":"page"},{"location":"comparison/#Matlab","page":"Comparison","title":"Matlab","text":"","category":"section"},{"location":"comparison/#FOTF-toolbox","page":"Comparison","title":"FOTF toolbox","text":"","category":"section"},{"location":"comparison/","page":"Comparison","title":"Comparison","text":"FOTF toolbox is a Matlab toolbox developed by Prof Dingyu Xue, with fractional calculus, fractional differential equations and fractional order systems integrated together. To be honest, FOTF has a great impact on FractionalDiffEq.jl, all of the algorithm in FOTF toolbox is all supported in FractionalDiffEq.jl","category":"page"},{"location":"comparison/#corresponding-APIs:","page":"Comparison","title":"corresponding APIs:","text":"","category":"section"},{"location":"comparison/","page":"Comparison","title":"Comparison","text":"FOTF toolbox FractionalDiffEq.jl\nfode_sol9 ClosedForm\nfode_solm ClosedFormHankelM\nnlfode_vec NonLinearAlg","category":"page"},{"location":"comparison/#Matrix-approach-to-discretization-of-ODEs-and-PDEs-of-arbitrary-real-order","page":"Comparison","title":"Matrix approach to discretization of ODEs and PDEs of arbitrary real order","text":"","category":"section"},{"location":"comparison/","page":"Comparison","title":"Comparison","text":"The corresponding matrix discretization paper and toolbox is developed by Prof Igor Podlubny. The corresponding matrix discretization method in FractionalDiffEq.jl is FODEMatrixDiscrete and FPDEMatrixDiscrete.","category":"page"},{"location":"comparison/#FLMM2-Toolbox","page":"Comparison","title":"FLMM2 Toolbox","text":"","category":"section"},{"location":"comparison/","page":"Comparison","title":"Comparison","text":"FLMM2 toolbox is a toolbox developed by Prof Roberto Garrappa together with his paper","category":"page"},{"location":"comparison/#Python","page":"Comparison","title":"Python","text":"","category":"section"},{"location":"comparison/","page":"Comparison","title":"Comparison","text":"fodeint: With explicit one-step Adams-Bashforth (Euler) method.","category":"page"},{"location":"comparison/#R","page":"Comparison","title":"R","text":"","category":"section"},{"location":"comparison/","page":"Comparison","title":"Comparison","text":"Also don't see any packages for fractional differential equations.","category":"page"},{"location":"fpde/#Fractional-Order-Partial-Differential-Equations","page":"Fractional PDE","title":"Fractional Order Partial Differential Equations","text":"","category":"section"},{"location":"fpde/","page":"Fractional PDE","title":"Fractional PDE","text":"Several models of physical and biological processes are better described using fractional PDEs than the corresponding integer-order PDEs. They serve as a generalization of the integer-order PDEs and give some degree of freedom in varying the rate of change of these physical and biological processes.","category":"page"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"CurrentModule = FractionalDiffEq","category":"page"},{"location":"#FractionalDiffEq.jl","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"","category":"section"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"Hello there👋!","category":"page"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"FractionalDiffEq.jl is a Julia package aiming at solving Fractional Differential Equations using high performance numerical methods.","category":"page"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"Pages = [\"index.md\"]","category":"page"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"tip: Star Us\nIf you think FractionalDiffEq.jl is useful and powerful, please star us in GitHub, it means a lot to us!","category":"page"},{"location":"#Installation","page":"FractionalDiffEq.jl","title":"Installation","text":"","category":"section"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"If you have already installed Julia, you can install FractionalDiffEq.jl in REPL using Julia package manager:","category":"page"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"pkg> add FractionalDiffEq","category":"page"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"Or if you want to experience the latest version of FractionalDiffEq.jl:","category":"page"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"pkg> add FractionalDiffEq#master","category":"page"},{"location":"#Features","page":"FractionalDiffEq.jl","title":"Features","text":"","category":"section"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"While most fractional differential equations solvers are implemented using Matlab, FractionalDiffEq.jl is totally driven by Julia and licensed with MIT License, ensure its everlasting development and open source.\nBenefit from the advancing features of JuliaLang, FractionalDiffEq.jl has impressing performance and high speed, help the model more efficient and robust.\nCapable of solving both linear and nonlinear fractional differential equations.\nDetailed models supporting, such as Bagley Torvik equations, Relaxation Oscillation equation etc.","category":"page"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"See SciFracX 2021 Winter Report","category":"page"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"(Image: conf2021)","category":"page"},{"location":"#Roadmap","page":"FractionalDiffEq.jl","title":"Roadmap","text":"","category":"section"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"More algorithms are planned to support.\nImprove benchmark.\nSystems of FDEs.\nConnect with SciML ecosystem.\nMore interesting ideas~","category":"page"},{"location":"#Contributing","page":"FractionalDiffEq.jl","title":"Contributing","text":"","category":"section"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"The development of FractionalDiffEq.jl is on GitHub, please report bugs or send pull requests to help FractionalDiffEq.jl grow.","category":"page"},{"location":"#Acknowledge","page":"FractionalDiffEq.jl","title":"Acknowledge","text":"","category":"section"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"FractionalDiffEq.jl is built upon the hard work of many scientific researchers, I sincerely appreciate what they have done to help the development of science and technology.","category":"page"},{"location":"","page":"FractionalDiffEq.jl","title":"FractionalDiffEq.jl","text":"info: WIP\nFractionalDiffEq.jl is under heavy construction, some APIs or docs might change a lot.","category":"page"},{"location":"example/#Examples","page":"Examples","title":"Examples","text":"","category":"section"},{"location":"example/#FDE-Example","page":"Examples","title":"FDE Example","text":"","category":"section"},{"location":"example/#An-easy-FDE-example","page":"Examples","title":"An easy FDE example","text":"","category":"section"},{"location":"example/","page":"Examples","title":"Examples","text":"Long story short! Let's try FractionalDiffEq.jl to solve a fractional differential equation!!!","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"Suppose we have the initial value problem:","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"D^05 y(x)=1-y \n\ny(0)=0","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"So to solve the problem, we can use FractionalDiffEq.jl like this:","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"using FractionalDiffEq, Plots, LaTeXStrings\n\ns=\"\\$D^{0.5}y(x)=1-y,\\\\ y(0)=0\\$\"\n\nfun(x, y) = 1-y\nprob=FDEProblem(fun, 0.5, 0, 5, 0.001)\nresult=solve(prob, PECE())\ntspan=collect(0:0.001:5)\n\nplot(tspan, result, title=s, linewidth=2, legend=:bottomright)","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"And execute the file in your favorite IDE (VSCode recommend).","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"Bingo!! You get the result!","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"(Image: Simple Example image)","category":"page"},{"location":"example/#Comparison-with-analytical-solution","page":"Examples","title":"Comparison  with analytical solution","text":"","category":"section"},{"location":"example/","page":"Examples","title":"Examples","text":"Let's see if the result computed using FractionalDiffEq.jl is correct compared with analytical solution.","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"Suppose there is an initial value problem:","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"D^18y(x)+y(x)=1 \ny(0)=0 y(0)=0","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"We already know the solution of this fractional differential equation is","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"y(x)=x^18E_18 28(-x^18)","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"Here, E represent Mittag Leffler function:","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"E_alpha beta=displaystylesum_k=0^inftyfracz^kGamma(alpha k+beta)","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"The Mittag Leffler function E_alpha beta is build inside the FractionalDiffEq.jl.","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"using FractionalDiffEq\nusing Plots\n\n#Analytical solution\ntarget = []\n\nfor i in 0:0.01:20\n    push!(target, i^1.8*mittleff(1.8,2.8,-i^1.8))\nend\n\ns=\"\\$D^{1.8}y(x)=1-y(x),\\\\ y(0)=0\\$\"\n\n#Numerical solution\nfun(x, y) = 1-y\nprob = FDEProblem(fun, 1.8, 0, 20, 0.01)\nresult=solve(prob, PECE())\ntspan=collect(0:0.01:20)\n\ngr()\n\nplot(tspan, result, title=s, linewidth=5, label=\"Numerical\", legend=:bottomright)\nplot!(tspan, target, lw=3, ls=:dash, label=\"Analytical\")","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"And execute the program you can get:","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"(Image: Example image)","category":"page"},{"location":"example/#ODE-Example","page":"Examples","title":"ODE Example","text":"","category":"section"},{"location":"example/","page":"Examples","title":"Examples","text":"It is noteworthy that some differential equation solvers in FractionalDiffEq.jl is also capable of solving Ordinary Differential Equations, let's directly see an example here!!","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"If the IVP is:","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"fracd^2ydx^2+fracdydx=sin(x)","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"y(0)=0","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"We already know the anlytical solution is","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"frac12(-e^-x-sin(x)-cos(x)+2)","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"We can use the FODEMatrixDiscrete algorithm to solve this ODE:","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"using FractionalDiffEq\nusing Plots, LaTeXStrings\n\ns=\"\\$ODE\\\\ Example\\$\"\n\nT = 30\nh=0.05\ntspan = collect(0.05:h:T)\n\nf(x)=1/2*(-exp(-x)-sin(x)-cos(x)+2)\ntarget=f.(tspan)\n\neq = D(600, 2, h)+D(600, 1, h)\nrightfun(x) = sin(x)\nresult = solve(eq, rightfun, 2, h, T, FODEMatrixDiscrete())\n\nplot(tspan, result, title=s, legend=:bottomright, label=\"ODE Numerical Solution!\")\n\nplot!(tspan, target, lw=3,ls=:dash,label=\"ODE Analytical Solution!\")","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"And by plotting the numerical and analytical solution, we can see the matrix discrete algorithm in FractionalDiffEq.jl is quite powerful!","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"(Image: ODE Example)","category":"page"},{"location":"example/","page":"Examples","title":"Examples","text":"tip: Better Choice\nWhile the solver in FractionalDiffEq.jl can solve ordinary differential equations, we still strongly recommend users to use SciML/OrdinaryDiffEq.jl to solve ODEs instead, for various, robust and perfornant algorithms","category":"page"},{"location":"example/#PDE-Example","page":"Examples","title":"PDE Example","text":"","category":"section"}]
}
