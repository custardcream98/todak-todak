import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useRef, useState } from "react";
import { firebaseAuth } from "../config/firebase-config";
import Posts from "./Posts";

export default function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [authorizedUser, setAuthorizedUser] = useState(
    false || !!sessionStorage.getItem("accessToken")
  );
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  /**
   * 로그인 폼 제출시
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const onSubmit = async (event) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setIsLoggingIn(true);

    event.preventDefault();
    event.stopPropagation();

    await setPersistence(firebaseAuth, browserSessionPersistence);

    try {
      const user = await signInWithEmailAndPassword(firebaseAuth, email, password);

      if (user) {
        const idToken = await user.user.getIdToken(true);
        sessionStorage.setItem("accessToken", idToken);
        setAuthorizedUser(true);
      }

    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/wrong-password") {
        console.log("비번 틀림");
        setIsLoggingIn(false);
        return;
      }

      if (error.code === "auth/user-not-found") {
        try {
          const createdUser = await createUserWithEmailAndPassword(firebaseAuth, email, password);

          if (createdUser) {
            const idToken = await createdUser.user.getIdToken(true);
            sessionStorage.setItem("accessToken", idToken);
            setAuthorizedUser(true);
          }
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            console.log("이미 사용중인 이메일");
          }
          setIsLoggingIn(false);
          return;
        }
      }
    }
  };

  const onLogoutButtonClick = async () => {
    await signOut(firebaseAuth);
    sessionStorage.clear();
    setAuthorizedUser(false);
    setIsLoggingIn(false);
    alert("로그아웃 됐습니다.");
  };

  return authorizedUser ? (
    <>
      <p>로그인 됐습니다.</p>
      <Posts token={sessionStorage.getItem("accessToken")} />
      <button onClick={onLogoutButtonClick} type="button">로그아웃</button>
    </>
  ) : (
    isLoggingIn ?
      <p>로그인중...</p>
      :
      <form onSubmit={onSubmit}>
        <input ref={emailRef} type="email" name="email" required />
        <input ref={passwordRef} type="password" name="password" required />
        <button type="submit">로그인</button>
      </form>
  );
}
