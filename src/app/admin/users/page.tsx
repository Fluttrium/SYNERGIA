"use client";

import { motion } from "framer-motion";
import UserTable from "@/components/admin-components/users-admin-components/users-tables";

export default function UsersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full p-8"
    >
      <section className="min-h-screen">
        <div className="text-5xl lg:text-7xl font-bold mb-8">
          Пользователи
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <UserTable />
        </motion.div>
      </section>
    </motion.div>
  );
}

