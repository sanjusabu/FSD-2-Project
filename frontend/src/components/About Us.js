import React, { useState, useEffect } from "react";
import "./About Us.css";
import data from "./data";
import NavBar from "./NavBar";
const About = () => {
  const [member] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = member.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, member]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section>  
      <NavBar />
      <div className="title">
      
        <h2>Our Team</h2>
      </div>
      <div className="section-center">
        {member.map((item, indexMember) => {
          const { id, image, name, Rollno, Skills,githubProfile} = item;
          let position = "nextSlide";
          if (indexMember === index) {
            position = "activeSlide";
          }
          if (
            indexMember === index - 1 ||
            (index === 0 && indexMember === member.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{Rollno}</p>
              <p className="text">{Skills}</p>
              <a href={githubProfile}><i class="fa-brands fa-github"></i></a>
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
        <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
        <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default About;
