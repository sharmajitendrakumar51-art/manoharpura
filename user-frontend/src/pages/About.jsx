import "../assets/css/About.css";
import certificate from "../assets/images/certificate.jpg";

const About = () => {
  return (
    <>

      {/* About Section */}

      <section className="about-section">

        <div className="container">

          <div className="row align-items-center g-5">

            {/* Left Image */}

            <div className="col-lg-5">

              <div className="certificate-card">

                <img
                  src={certificate}
                  alt="Registration Certificate"
                  className="img-fluid"
                />

              </div>

            </div>

            {/* Right Content */}

            <div className="col-lg-7">

              <div className="about-content">

              

                <h2>
                  Manoharpura Mokshdham
                  <br />
                  Vikas Samiti
                </h2>

                <p>

                  This samiti is a
                  community-driven organization dedicated to
                  maintaining and developing a peaceful,
                  clean, and well-managed cremation ground
                  for the residents of Jaipur.

                </p>

                <p>

                  The Samiti works with the principles of
                  <strong> Seva, Samarpan and Sanskaar </strong>
                  to ensure dignified last rites while providing
                  essential facilities for families and visitors.

                </p>

                <p>

                  We are committed to cleanliness,
                  environmental sustainability,
                  security, and continuous development
                  with the support of society,
                  government bodies and volunteers.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= Mission & Vision ================= */}

<section className="mission-section">

  <div className="container">

    {/* <div className="section-title">

      <h2>Our Mission & Vision</h2>

      <p>
        Dedicated to serving society with dignity, compassion and responsibility.
      </p>

    </div> */}

    <div className="row g-4">

      {/* Mission */}

      <div className="col-lg-6">

        <div className="mission-card">

          <div className="mission-icon">
            <i className="bi bi-bullseye"></i>
          </div>

          <h3>Our Mission</h3>

          <p>
            To deliver efficient, compassionate, and respectful cremation
            services while maintaining the highest standards of hygiene,
            safety, and environmental sustainability. We strive to support
            grieving families with empathy and care, ensuring a peaceful
            and harmonious environment for the final journey of their
            loved ones.
          </p>

        </div>

      </div>

      {/* Vision */}

      <div className="col-lg-6">

        <div className="mission-card">

          <div className="mission-icon">
            <i className="bi bi-eye-fill"></i>
          </div>

          <h3>Our Vision</h3>

          <p>
            To create a peaceful, dignified, and spiritually uplifting
            environment for performing the last rites with respect and
            compassion. We aspire to develop Manoharpura Mokshdham as
            a model cremation facility that serves society with
            transparency, sustainability, and community welfare.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>

{/* ================= OBJECTIVES ================= */}

<section className="objective-section">

  <div className="container">

    <div className="section-title">

      <h2>Our Objectives</h2>

    </div>

    <div className="objective-card">

      <ul>

        <li>मनोहरपुरा मोक्षधाम की सम्पूर्ण देखभाल करना एवं आवश्यकतानुसार जनोपयोगी नियम बनाना।</li>

        <li>साफ-सफाई एवं विद्युत लाईट (रोशनी) की उचित व्यवस्था कराना।</li>

        <li>महानुभावों एवं आगन्तुकों के लिए बैठने की उचित व्यवस्था करना।</li>

        <li>टीन शेडों की उचित व्यवस्था करना एवं सुरक्षा हेतु सी.सी.टी.वी. कैमरे लगवाना।</li>

        <li>नहाने, धोने एवं कपड़े बदलने की व्यवस्था करना एवं शौचालय का निर्माण कराना।</li>

        <li>पानी की निकासी के लिए उचित व्यवस्था करना।</li>

        <li>बोरिंग/बोरवेल तथा शुद्ध पेयजल (आर.ओ. एवं वाटर कूलर) की व्यवस्था करना।</li>

        <li>सत्संग कक्ष, कार्यालय, मंदिर एवं अन्य धार्मिक एवं सामाजिक भवनों का निर्माण कराना।</li>

        <li>गरीब, निराश्रित, असहाय एवं लावारिस व्यक्तियों के लिए निःशुल्क दाह संस्कार एवं अस्थि विसर्जन की व्यवस्था करना।</li>

        <li>मंदिर में पूजन एवं धार्मिक कार्यों हेतु अस्थायी पुजारियों की व्यवस्था करना।</li>

        <li>उचित अथवा लागत मूल्य पर दाह संस्कार सामग्री उपलब्ध कराना।</li>

        <li>सरकारी योजनाओं एवं सुविधाओं का लाभ लेकर मोक्षधाम का विकास करना।</li>

        <li>मोक्षधाम को अतिक्रमण मुक्त रखना एवं अतिक्रमण रोकना।</li>

        <li>सांसद, विधायक, नगर निगम, जयपुर विकास प्राधिकरण, भामाशाह, CSR संस्थाओं एवं NGOs के सहयोग से विकास एवं जीर्णोद्धार कार्य कराना।</li>

        <li>वेतनिक कर्मचारियों एवं सुरक्षा गार्ड की नियुक्ति करना।</li>

        <li>संस्था के सदस्यों एवं स्थानीय ग्रामवासियों से प्राप्त सुझावों पर विचार करना।</li>

      </ul>

    </div>

  </div>

</section>

    </>
  );
};

export default About;