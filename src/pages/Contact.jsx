import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { useToast } from '../context/ToastContext';
import { WHATSAPP_NUMBER } from '../data/products';
import { CONTACT_INFO } from '../data/contact';
import { CONTACT_PAGE_HEADER, CONTACT_PAGE_CONTENT } from '../data/contactPage';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast(CONTACT_PAGE_CONTENT.validationErrorToast, 'error', '!');
      return;
    }
    const text = `Hello, my name is ${form.name} (${form.email}).\n\n${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    addToast(CONTACT_PAGE_CONTENT.successToast, 'success', '✦');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <PageHeader eyebrow={CONTACT_PAGE_HEADER.eyebrow} title={CONTACT_PAGE_HEADER.title} subtitle={CONTACT_PAGE_HEADER.subtitle} />

      <div className="container contact-page">
        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-info__title t-display">{CONTACT_PAGE_CONTENT.infoTitle}</h3>

            <div className="contact-info__item">
              <span className="contact-info__icon">✦</span>
              <div>
                <strong>{CONTACT_PAGE_CONTENT.addressLabel}</strong>
                <p>{CONTACT_INFO.address}</p>
              </div>
            </div>

            <div className="contact-info__item">
              <span className="contact-info__icon">✦</span>
              <div>
                <strong>{CONTACT_PAGE_CONTENT.emailLabel}</strong>
                <p>{CONTACT_INFO.email}</p>
              </div>
            </div>

            <div className="contact-info__item">
              <span className="contact-info__icon">✦</span>
              <div>
                <strong>{CONTACT_PAGE_CONTENT.phoneLabel}</strong>
                <p>+{WHATSAPP_NUMBER}</p>
              </div>
            </div>

            <div className="contact-info__item">
              <span className="contact-info__icon">✦</span>
              <div>
                <strong>{CONTACT_PAGE_CONTENT.hoursLabel}</strong>
                <p>{CONTACT_INFO.hours}</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {CONTACT_PAGE_CONTENT.chatButtonLabel}
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3 className="contact-form__title t-display">{CONTACT_PAGE_CONTENT.formTitle}</h3>

            <div className="contact-form__field">
              <label htmlFor="name">{CONTACT_PAGE_CONTENT.nameFieldLabel}</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={CONTACT_PAGE_CONTENT.namePlaceholder}
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="email">{CONTACT_PAGE_CONTENT.emailFieldLabel}</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={CONTACT_PAGE_CONTENT.emailPlaceholder}
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="message">{CONTACT_PAGE_CONTENT.messageFieldLabel}</label>
              <textarea
                id="message"
                rows="5"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={CONTACT_PAGE_CONTENT.messagePlaceholder}
                required
              />
            </div>

            <button type="submit" className="contact-form__submit">{CONTACT_PAGE_CONTENT.submitButtonLabel}</button>
          </form>
        </div>
      </div>
    </>
  );
}
