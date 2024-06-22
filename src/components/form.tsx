"use client";
import Input from "./ui/inputs/forminput";
import "@/components/styles/Form.scss";

export default function Form() {
  return (
    <section className="section flex justify-center">
      <div className="flex flex-col md:flex-row z-1 w-full">
        {/* Contact Information - Hidden on small screens */}
        <div className="hidden md:flex flex-col md:flex-row items-center md:items-start mt-20 mx-4 md:mx-0 md:ml-40 md:mr-auto">
          <div className="container w-full md:w-max rounded flex-col">
            <div className="m-9 text-5xl text-center md:text-left">Свяжитесь с нами</div>
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
              <div className="justify-center items-center text-center md:text-center ms:text-center"> {/* Изменено */}
  <h2 className="text-3xl font-semibold">Отправьте нам письмо</h2>
</div>
                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8">
                  <div className="col-span-4">
                    <div className="space-y-10">
                      <Input name="Имя" placeholder="Ваше имя" />
                      <Input name="Почта" placeholder="example@yourmail.com" />
                      <Input name="Телефон" placeholder="+7(XXX)-XXX-XX-XX" />
                      <div className="flex justify-center items-center">
                        <button
                          type="button"
                          className="text-white bg-purple-600 hover:bg-purple-600 focus:ring-4 focus:ring-purple-600 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-600 focus:outline-none dark:focus:ring-purple-600"
                        >
                          Отправить письмо
                        </button>
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
}
