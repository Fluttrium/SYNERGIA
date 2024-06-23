/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import Input from "./ui/inputs/forminput";
import "@/components/styles/Form.scss";

const Form: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false); // Состояние для чекбокса

  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Обновляем состояние isChecked
  };

  useEffect(() => {
    const button = document.getElementById(
      "submit-button"
    ) as HTMLButtonElement;
    button.disabled = !isChecked; // Устанавливаем disabled в зависимости от состояния isChecked
  }, [isChecked]);

  return (
    <section className="section flex justify-center">
      <div className="flex flex-col md:flex-row z-1 w-full">
        {/* Contact Information - Hidden on small screens */}
        <div className="hidden md:flex flex-col md:flex-row items-center md:items-start mt-20 mx-4 md:mx-0 md:ml-40 md:mr-auto">
          <div className="container w-full md:w-max rounded flex-col">
            <div className="m-9 text-5xl text-center md:text-left">
              Свяжитесь с нами
            </div>
            <div className="flex flex-row m-9 md:pt-14 space-x-10">
              <div className="container flex flex-col">
                <p className="text-xl pb-3">Наше расположение</p>
                <p>улица Славянская, дом 3</p>
              </div>
              <div className="container flex flex-col">
                <div className="container flex flex-col">
                  <p className="text-xl pb-3">Как мы можем помочь?</p>
                  <p>fond.synergy@mail.ru</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Form */}
        <div className="flex justify-center items-center py-28 w-full">
          <div className="bg-white drop-shadow-lg container w-max rounded py-8 mx-auto">
            <div className="m-9">
              <form>
                <div className="justify-center items-center text-center md:text-center ms:text-center">
                  {" "}
                  {/* Изменено */}
                  <h2 className="text-3xl font-semibold">
                    Отправьте нам письмо
                  </h2>
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
                            className="ms-2 text-xs w-52 font-light text-gray-900 dark:text-gray-300"
                          >
                            Я подтверждаю, что ознакомлен(-а) с Политикой
                            обработки персональных данных, а также даю согласие
                            «Согласие на обработку персональных данных» на
                            обработку своих персональных данных в соответствии
                            Федеральным законом от 27.07.2006 &#x2116; 152-ФЗ "О
                            персональных данных". Настоящее согласие даётся мною
                            бессрочно.
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
