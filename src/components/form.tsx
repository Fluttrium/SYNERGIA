/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState, MouseEvent } from "react";
import Input from "./ui/inputs/forminput";
import "@/components/styles/Form.scss";
import Link from "next/link";

const Form: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false); // Состояние для чекбокса

  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Обновляем состояние isChecked
  };

  const downloadPDF1 = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "docs/Политика_конфиденциальности_ФС_compressed.pdf"; // или '/api/download-pdf' если используете API Route
    link.download = "Политика конфиденциальности";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadPDF2 = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "docs/Соглашение_на_обработку_данных_ФС_compressed.pdf"; // или '/api/download-pdf' если используете API Route
    link.download = "Соглашение на обработку данных";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const button = document.getElementById(
      "submit-button"
    ) as HTMLButtonElement;
    button.disabled = !isChecked; // Устанавливаем disabled в зависимости от состояния isChecked
  }, [isChecked]);

  return (
    <section className="section flex justify-center">
      <div className="flex flex-col items-center w-full">
        {/* Contact Information */}
        {/* Form */}
        <div className="flex justify-center items-center py-8 w-full">
          <div className="bg-white drop-shadow-lg container w-max rounded py-2 mx-auto">
            <div className="m-9">
              <form>
                <div className="justify-center items-center text-center">
                  <div className="text-4xl font-bold mb-4 text-center">
                    Свяжитесь с нами
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8">
                  <div className="col-span-4">
                    <div className="space-y-10">
                      <Input name="Имя" placeholder="Ваше имя" />
                      <Input name="Почта" placeholder="example@yourmail.com" />
                      <Input name="Телефон" placeholder="+7(XXX)-XXX-XX-XX" />
                      <div className="flex-col justify-center items-center">
                        <button
                          id="submit-button"
                          type="button"
                          className={`text-white bg-purple-600 hover:bg-purple-600 focus:ring-4 focus:ring-purple-600 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-600 focus:outline-none dark:focus:ring-purple-600 ${isChecked ? "" : "opacity-50 cursor-not-allowed"}`}
                          disabled={!isChecked}
                        >
                          Отправить письмо
                        </button>
                        <div className="flex items-start justify-start mt-3">
                          <input
                            id="link-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={handleCheckboxChange}
                          />
                          <label
                            htmlFor="link-checkbox"
                            className="ms-2 text-xs w-52 font-light text-gray-900 dark:text-gray-600"
                          >
                            Я подтверждаю, что ознакомлен(-а) с{" "}
                            <Link
                              onClick={downloadPDF1}
                              href=""
                              className="text-blue-600 underline"
                            >
                              Политикой обработки персональных данных
                            </Link>
                            , а также даю согласие{" "}
                            <Link
                              onClick={downloadPDF2}
                              href=""
                              className="text-blue-600 underline"
                            >
                              «Согласие на обработку персональных данных»
                            </Link>{" "}
                            на обработку своих персональных данных в
                            соответствии с Федеральным законом от 27.07.2006
                            &#x2116; 152-ФЗ "О персональных данных". Настоящее
                            согласие даётся мною бессрочно.
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
