

const Auth = ({ children }) => {
    return (
        <div className="landing">
            <div className="drak-overlay">
                <div className="landing-inner">
                    <h1>Learning</h1>
                    <h4>Welcome to the classroom</h4>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Auth