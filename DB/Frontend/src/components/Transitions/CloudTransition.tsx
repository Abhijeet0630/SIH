import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const CloudTransition: React.FC<{ active: boolean; stateName?: string }> = ({ active, stateName = 'Maharashtra' }) => (
  <AnimatePresence>
    {active && (
      <motion.div className="fixed inset-0 z-[100] overflow-hidden bg-[#f5efe5]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {[0,1,2,3,4,5].map((i) => <motion.div key={i} className="absolute rounded-full bg-white blur-2xl" style={{width:'55vw',height:'32vh',left:`${(i%3)*28-20}%`,top:`${Math.floor(i/3)*45-10}%`}} initial={{x:i%2?'-70vw':'70vw',scale:.7}} animate={{x:0,scale:1.7}} transition={{duration:1.15,delay:i*.05,ease:[.22,.9,.25,1]}} />)}
        <motion.div className="relative z-10 grid h-full place-items-center text-center" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.35}}>
          <div><p className="heritage-kicker">Entering the living archive</p><h2 className="font-serif text-4xl sm:text-6xl text-[#263238]">{stateName}</h2></div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
