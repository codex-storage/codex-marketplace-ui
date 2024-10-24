export const OnBoardingUtils = {
    getStep() {
        return parseInt(localStorage.getItem("onboarding-step") || "0", 10)
    },

    setStep(step: number) {
        localStorage.setItem("onboarding-step", step.toString())
    }
}