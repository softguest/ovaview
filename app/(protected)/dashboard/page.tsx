"use client"
import { motion } from "framer-motion";
import SubjectCard from "@/components/subjectCard/SubjectCard";
import React from "react"

const Dashboard = () => {

  const subjects = [
    {
      imageUrl: "https://www.gmercyu.edu/images/learn_pages/learn_cisheader.jpg",
      subjectTitle: "I.C.T",
      subjectDescription: "Understanding any topic in Information Communication Technology.",
      classTitle: "A Levels",
      link: "/ict",
      bgColor: "slate"
    },
    {
      imageUrl: "",
      subjectTitle: "Geography",
      subjectDescription: "Improve your understanding on Alevels Geography.",
      classTitle: "A Levels",
      link: "/ict",
      bgColor: "slate"
    },
    {
      imageUrl: "",
      subjectTitle: "Mastering Deep Learning",
      subjectDescription: "Understanding any topic you want in Deep Learning.",
      classTitle: "Bachelor's Degree",
      link: "/master-deep-learning",
      bgColor: "#fff"
    },
    {
      imageUrl: "",
      subjectTitle: "Virtual Instrumentation",
      subjectDescription: "Understanding any topic in Virtual Instrumentation.",
      classTitle: "Bachelor's Degree",
      link: "/virtual-instrumentation",
      bgColor: "slate"
    },
    {
      imageUrl: "",
      subjectTitle: "Artificial Intelligence Modified",
      subjectDescription: "Understanding any topic in Artificial Intelligence Modified.",
      classTitle: "Bachelor's Degree",
      link: "/artificial-intelligence-modified",
      bgColor: "slate"
    },
    {
      imageUrl: "",
      subjectTitle: "Pest And Disease Management",
      subjectDescription: "Understanding any topic in Pest And Disease Management.",
      classTitle: "Bachelor's Degree",
      link: "/agriculture-masters",
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