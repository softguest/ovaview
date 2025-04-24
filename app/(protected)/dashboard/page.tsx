"use client"
import { motion } from "framer-motion";
import SubjectCard from "@/components/subjectCard/SubjectCard";
import React from "react"

const Dashboard = () => {

  const subjects = [
    {
      imageUrl: "https://www.gmercyu.edu/images/learn_pages/learn_cisheader.jpg",
      subjectTitle: "I.C.T",
      subjectDescription: "Learn algebra, geometry, calculus, and more.",
      classTitle: "A Levels",
      link: "/ict",
      bgColor: "slate"
    },
    {
      imageUrl: "",
      subjectTitle: "Geography",
      subjectDescription: "Improve your grammar, vocabulary, and writing skills.",
      classTitle: "A Levels",
      link: "/ict",
      bgColor: "slate"
    },
    {
      imageUrl: "",
      subjectTitle: "Deep Learning with TensorFlow 2 and Keras",
      subjectDescription: "Explore Information and Communication Technology.",
      classTitle: "Masters",
      link: "/tensor-flow-two",
      bgColor: "orange"
    },
    {
      imageUrl: "",
      subjectTitle: "Introduction to Deep Learning Course code:CEC424",
      subjectDescription: "Dive into world history and significant events.",
      classTitle: "Masters",
      link: "/intro-deep-learning",
      bgColor: "#fff"
    },
    {
      imageUrl: "",
      subjectTitle: "Mastering Deep Learning",
      subjectDescription: "Understand maps, climate, and the earth’s structure.",
      classTitle: "Masters",
      link: "/master-deep-learning",
      bgColor: "#fff"
    },
    {
      imageUrl: "",
      subjectTitle: "Virtual Instrumentation Pr Moffo",
      subjectDescription: "Learn programming, algorithms, and technology basics.",
      classTitle: "Masters",
      link: "/virtual-instrumentation",
      bgColor: "slate"
    },
    {
      imageUrl: "",
      subjectTitle: "Virtual Instrumentation Janani",
      subjectDescription: "Learn programming, algorithms, and technology basics.",
      classTitle: "Masters",
      link: "/virtual-instrumentation-janani",
      bgColor: "slate"
    },
    {
      imageUrl: "",
      subjectTitle: "Artificial Intelligence Modified",
      subjectDescription: "Learn programming, algorithms, and technology basics.",
      classTitle: "Masters",
      link: "/artificial-intelligence-modified",
      bgColor: "slate"
    },
  ];

  return ( 
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 min-h-[80vh] gap-6 p-4">
    {subjects.map((subject, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="rounded-2xl"
      >
        <SubjectCard
          imageUrl={subject.imageUrl}
          subjectTitle={subject.subjectTitle}
          subjectDescription={subject.subjectDescription}
          classTitle={subject.classTitle}
          link={subject.link}
          bgColor={subject.bgColor}
        />
      </motion.div>
    ))}
  </div>
  );
}

export default Dashboard;