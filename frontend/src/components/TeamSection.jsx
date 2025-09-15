
import { motion } from "framer-motion";

export default function TeamSection(props) {
  return (
    <motion.div
      className="bg-white my-20 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition w-96 mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Team Member Image */}
      <img
        src={props.image}
        alt="Abdihakim"
        className="rounded-2xl w-64 h-40 object-cover -mt-12"
      />

      {/* Name */}
      <h2 className="mt-4 text-xl font-semibold">{props.name}</h2>

      {/* Role */}
      <p className="text-indigo-600 font-medium">{props.role}</p>

      {/* Description */}
      <p className="mt-2 text-gray-600 text-sm">
       {props.description}
      </p>

      {/* Optional button */}
     
    </motion.div>
  );
}
