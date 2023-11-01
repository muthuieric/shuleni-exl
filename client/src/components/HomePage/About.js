import React from "react";
import eLearnImage from "./e-learning.jpg"

const About = () => {
  return (
    <>
       {/* Image Content */}
       <div className="">
        <img className="w-full h-96  object-cover " src={eLearnImage} alt="e-LearnImage" />
      </div>

 {/* About Content */}
<div className="p-4 text-center">
  <h2 className="text-2xl font-bold text-blue-600 mb-4">About Shuleni</h2>
  <p className="text-base text-black">
    Shuleni is an innovative online education platform that aims to bridge the gap between physical and online
    education while maintaining the quality of learning. Our platform is designed to offer a comprehensive
    online school experience, replicating the essential elements of an on-site school, including
    teacher-student interactions, access to educational resources, attendance tracking, exams, and more.
  </p>
</div>

<div className="p-4 mb-8 text-center">
  <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
  <p className="text-base text-black">
    Our mission is to make quality education accessible to students everywhere, ensuring that they receive an
    enriching learning experience in a digital environment. We believe that online education can be as
    effective as traditional schooling when the right tools and resources are in place.
  </p>
</div>



    </>
  );
};

export default About;
