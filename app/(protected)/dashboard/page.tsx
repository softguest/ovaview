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
    // {
    //   imageUrl: "",
    //   subjectTitle: "Mathematics",
    //   subjectDescription: "Explore Information and Communication Technology.",
    //   classTitle: "A Levels",
    //   link: "/ict",
    //   bgColor: "orange"
    // },
    // {
    //   imageUrl: "",
    //   subjectTitle: "History",
    //   subjectDescription: "Dive into world history and significant events.",
    //   classTitle: "A Levels",
    //   link: "/ict",
    //   bgColor: "#fff"
    // },
    // {
    //   imageUrl: "",
    //   subjectTitle: "Geography",
    //   subjectDescription: "Understand maps, climate, and the earth’s structure.",
    //   classTitle: "A Levels",
    //   link: "/ict",
    //   bgColor: "#fff"
    // },
    // {
    //   imageUrl: "",
    //   subjectTitle: "Computer Science",
    //   subjectDescription: "Learn programming, algorithms, and technology basics.",
    //   classTitle: "A Levels",
    //   link: "/ict",
    //   bgColor: "slate-"
    // },
  ];

  return ( 
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-h-[80vh] gap-6 p-4">
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
          // onExplore={() => console.log(`Exploring ${subject.subjectTitle}...`)}
          link={subject.link}
          bgColor={subject.bgColor}
        />
      </motion.div>
    ))}
  </div>
  );
}

export default Dashboard;