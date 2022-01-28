import { AuthService } from ".";

class IdleTimer {
    constructor(timeout, onTimeout) {
        this.timeout = timeout;
        this.onTimeout = onTimeout;
        this.eventHandler = this.updateExpiredTime.bind(this);
        this.tracker();
        this.startInterval();
    }

    updateExpiredTime() {
        localStorage.setItem("_expiredTime", (Date.now() + this.timeout * 1000));
    }

    tracker() {
        window.addEventListener("click", this.eventHandler);
        window.addEventListener("scroll", this.eventHandler);
        window.addEventListener("keydown", this.eventHandler);
        window.addEventListener("mousemove", this.eventHandler);
        window.removeEventListener("mousemove", this.eventHandler);
    }

    cleanUp() {
        window.removeEventListener("click", this.eventHandler);
        window.removeEventListener("scroll", this.eventHandler);
        window.removeEventListener("keydown", this.eventHandler);
        window.removeEventListener("mousemove", this.eventHandler);
        window.removeEventListener("focus", this.eventHandler);

        localStorage.removeItem("_expiredTime")
        localStorage.clear()
    }

    startInterval() {
        this.updateExpiredTime();
        if (AuthService.isAuthenticated()) {
            this.interval = setInterval(() => {
                const expiredTime = parseInt(localStorage.getItem("_expiredTime") || 0, 10);
                if (expiredTime < Date.now()) {
                    console.log("Timeout");
                    if (this.onTimeout && AuthService.isAuthenticated()) {
                        console.log(AuthService.isAuthenticated())
                        this.onTimeout();
                        AuthService.logout()
                        //     .then(res => {
                        //     return <Redirect to={"/login"} /> 
                        // });
                        window.location.reload()
                        this.cleanUp();
                    }
                }
            }, 10000);
        }

    }
}

export default IdleTimer;