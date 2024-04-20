import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (response.ok) {
                // Xử lý phản hồi thành công
                const jsonData = await response.json();
                console.log("data: ", jsonData);
                if (jsonData.success) {
                    response.json().then(userInfo => {
                        setUserInfo(userInfo);
                        setRedirect(true);
                    })
                } else {
                    alert(jsonData.message);
                }
            } else {
                // Xử lý phản hồi lỗi
                alert('Đăng nhập thất bại!');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Lỗi: Không thể kết nối đến máy chủ.');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Đăng nhập</h1>
            <input
                type="text"
                placeholder="tên đăng nhập"
                value={username}
                onChange={ev => setUsername(ev.target.value)}
            />
            <input
                type="password"
                placeholder="mật khẩu"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <button type="submit">Đăng nhập</button>
        </form>
    );
}
