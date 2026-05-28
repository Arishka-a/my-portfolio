import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./Contact.module.scss";

const contacts = [
  {
    label: "Email",
    value: "arinavahr04@gmail.com",
    href: "mailto:arinavahr04@gmail.com",
  },
  {
    label: "Телефон",
    value: "+7 (908) 278-18-98",
    href: "tel:+79082781898",
  },
  {
    label: "GitHub",
    value: "github.com/Arishka-a",
    href: "https://github.com/Arishka-a",
  },
];

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>Связаться со мной</h2>
          <p className={styles.lead}>
            Открыта к предложениям и интересным задачам. Напишите через форму —
            или выберите удобный способ ниже.
          </p>

          <ul className={styles.list}>
            {contacts.map((c) => (
              <li key={c.label} className={styles.item}>
                <span className={styles.itemLabel}>{c.label}</span>
                <a
                  href={c.href}
                  className={styles.itemValue}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
                >
                  {c.value}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.formWrap}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}