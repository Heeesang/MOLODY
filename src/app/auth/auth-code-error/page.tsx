export default function AuthCodeError() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>Authentication Error</h1>
        <p>Something went wrong during login. Please try again.</p>
        <a href="/" className="text-blue-600 underline">Go back to home</a>
      </div>
    );
  }