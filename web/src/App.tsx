import { Component, type ReactNode, useEffect } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"

type ErrorBoundaryState = {
    error: Error | null
}

class AppErrorBoundary extends Component<
    { children: ReactNode },
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = { error: null }

    static getDerivedStateFromError(error: Error) {
        return { error }
    }

    componentDidCatch(error: Error) {
        console.error(error)
    }

    reset = () => {
        this.setState({ error: null })
    }

    render() {
        if (this.state.error) {
            return <ErrorFallback error={this.state.error} reset={this.reset} />
        }

        return this.props.children
    }
}

function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="max-w-md text-center">
                <h1 className="text-7xl font-bold text-foreground">404</h1>
                <h2 className="mt-4 text-xl font-semibold text-foreground">
                    Page not found
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </div>
    )
}

function ErrorFallback({ reset }: { error: Error; reset: () => void }) {

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="max-w-md text-center">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                    This page didn't load
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Something went wrong on our end. You can try refreshing or
                    head back home.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Try again
                    </button>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </div>
    )
}

function ExternalRedirect({ to }: { to: string }) {
    useEffect(() => {
        window.location.replace(to)
    }, [to])

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="max-w-md text-center">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                    Redirecting...
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    If you are not redirected,{" "}
                    <a href={to} rel="noopener noreferrer" className="text-primary hover:underline">
                        click here
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <AppErrorBoundary>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/linkedin"
                        element={
                            <ExternalRedirect to="https://linkedin.com/in/suryansh-parashar" />
                        }
                    />
                    <Route
                        path="/github"
                        element={
                            <ExternalRedirect to="https://github.com/suryanshparashar" />
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AppErrorBoundary>
        </BrowserRouter>
    )
}
