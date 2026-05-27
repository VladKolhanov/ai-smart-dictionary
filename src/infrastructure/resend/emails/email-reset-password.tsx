import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
import { createTranslator, type Locale } from "next-intl"

interface Props {
  name: string
  url: string
  locale: Locale
}

export const EmailResetPassword = async ({ name, url, locale }: Props) => {
  const t = createTranslator({
    messages: await import(`../../i18n/messages/shared/common/${locale}.json`),
    namespace: "email.emailResetPassword.letter",
    locale,
  })

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{t("preview")}</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="mx-auto mt-0 mb-16 max-w-140 rounded-lg border border-solid border-[#e6ebf1] bg-white px-5 py-10">
            <Heading className="pt-4.25 text-[24px] leading-[1.3] font-normal tracking-[-0.5px] text-[#484848]">
              {t("heading", { name })}
            </Heading>

            <Text className="mb-3.75 text-[15px] leading-[1.4] text-[#3c4149]">
              {t("paragraphMain")}
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="text-4 block rounded-[5px] bg-black px-6 py-3 text-center font-semibold text-white no-underline"
                href={url}
              >
                {t("button")}
              </Button>
            </Section>

            <Text className="mb-3.75 text-[15px] leading-[1.4] text-[#3c4149]">
              {t("paragraphDescription")}
            </Text>

            <Hr className="my-5 border-[#e6ebf1]" />

            <Text className="text-[12px] leading-4 text-[#8898aa]">
              {t("footer")}
              <br />
              <Link
                href={url}
                className="text-[12px] text-[#b4becc]"
              >
                {url}
              </Link>
            </Text>

            <Text className="text-[12px] leading-4 text-[#8898aa]">
              © {new Date().getFullYear()} LEXIO. {t("footer-copyright")}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

EmailResetPassword.PreviewProps = {
  name: "John Doe",
  url: "http://sdadwqe123wddsjhakh4h324hdnas",
  locale: "en",
} satisfies Props

export default EmailResetPassword
