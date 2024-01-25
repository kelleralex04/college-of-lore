// import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignUpFormFunc from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import './AuthPage.css'

export default function AuthPage({ setUser }) {
    return (
        <main className="AuthPage">
            <h1>College of Lore</h1>
            <SignUpFormFunc setUser={setUser} />
            <LoginForm setUser={setUser} />
        </main>
    );
}