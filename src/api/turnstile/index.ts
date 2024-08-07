export async function turnstileVerify(res: string) {
  try {
    const turnstileFormData = new FormData();
    turnstileFormData.append(
      "secret",
      process.env.CLOUDFLARE_TURNSTILE_SECRET || "",
    );
    turnstileFormData.append("response", res);

    const result = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        body: turnstileFormData,
        method: "POST",
      },
    );

    const outcome = await result.json();

    return outcome.success;
  } catch {
    return false;
  }
}
