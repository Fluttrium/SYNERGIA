"use client";
import { useMemo, useState } from "react";
import "@/components/styles/Form.scss";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export type ContactFormValues = {
    category: string;
    fullName: string;
    organization?: string;
    email: string;
    phone: string;
    message: string;
    attachments: FileList | null;
};

const Form: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm<ContactFormValues>({
        defaultValues: {
            category: "",
            fullName: "",
            organization: "",
            email: "",
            phone: "",
            message: "",
            attachments: null,
        },
    });
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const attachmentsWatcher = watch("attachments");

    const categories = useMemo(
        () => [
            { value: "resettlement", label: "Переселение" },
            { value: "legal_support", label: "Правовая поддержка" },
            { value: "money_transfer", label: "Поддержка перевода денежных средств" },
            { value: "other", label: "Другое" },
        ],
        []
    );

    const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
        if (!executeRecaptcha) {
            console.error('ReCAPTCHA not available');
            return;
        }

        // Выполняем проверку ReCaptcha
        const gRecaptchaToken = await executeRecaptcha('registerSubmit');

        try {
            setIsSubmitting(true);
            setFeedback(null);

            // Отправляем запрос на сервер для проверки ReCaptcha
            const response = await fetch('/api/recaptchasubmit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gRecaptchaToken })
            });

            const result = await response.json();

            // Проверяем результат проверки ReCaptcha
            if (result.success) {
                console.log(`ReCaptcha success with score: ${result.score}`);
                await sendEmail(data); // Вызов sendEmail только если проверка ReCaptcha успешна
                setFeedback({ type: "success", message: "Ваше обращение успешно отправлено." });
                reset();
                setIsChecked(false);
            } else {
                console.error(`ReCaptcha verification failed with score: ${result.score}`);
                setFeedback({ type: "error", message: "Не удалось пройти проверку ReCaptcha. Попробуйте ещё раз." });
            }
        } catch (error) {
            console.error('Error during ReCaptcha verification:', error);
            setFeedback({ type: "error", message: "Произошла ошибка при отправке. Попробуйте позже." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const downloadPDF1 = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const link = document.createElement("a");
        link.href = "docs/Политика_конфиденциальности_ФС_compressed.pdf";
        link.download = "Политика конфиденциальности";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadPDF2 = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const link = document.createElement("a");
        link.href = "docs/Соглашение_на_обработку_данных_ФС_compressed.pdf";
        link.download = "Соглашение на обработку данных";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="section flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
                <div className="flex justify-center items-center py-4 sm:py-6 lg:py-8 w-full">
                    <div className="bg-white drop-shadow-lg w-full rounded-lg sm:rounded-xl py-4 sm:py-6 lg:py-8 mx-auto">
                        <div className="px-4 sm:px-6 lg:px-9 w-full max-w-3xl mx-auto">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                                <div className="justify-center items-center text-center">
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-center">
                                        Свяжитесь с нами
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-500 px-2">
                                        Оставьте обращение, и мы свяжемся с вами в ближайшее время
                                    </p>
                                </div>
                                <div className="mt-3 grid grid-cols-1 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                                            Категория обращения *
                                        </label>
                                        <select
                                            {...register("category", { required: "Выберите категорию обращения" })}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2.5 sm:py-2 text-sm sm:text-base focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                                        >
                                            <option value="">Выберите категорию</option>
                                            {categories.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.category.message}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                                                ФИО *
                                            </label>
                                            <input
                                                {...register("fullName", { required: "Укажите ФИО" })}
                                                type="text"
                                                placeholder="Иванов Иван Иванович"
                                                className="w-full rounded-md border border-gray-300 px-3 py-2.5 sm:py-2 text-sm sm:text-base focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                                            />
                                            {errors.fullName && (
                                                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.fullName.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                                                Организация (если есть)
                                            </label>
                                            <input
                                                {...register("organization")}
                                                type="text"
                                                placeholder="Название организации"
                                                className="w-full rounded-md border border-gray-300 px-3 py-2.5 sm:py-2 text-sm sm:text-base focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                                                Email *
                                            </label>
                                            <input
                                                {...register("email", {
                                                    required: "Укажите email",
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: "Неверный формат email",
                                                    },
                                                })}
                                                type="email"
                                                placeholder="example@yourmail.com"
                                                className="w-full rounded-md border border-gray-300 px-3 py-2.5 sm:py-2 text-sm sm:text-base focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.email.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                                                Телефон *
                                            </label>
                                            <input
                                                {...register("phone", {
                                                    required: "Укажите телефон",
                                                })}
                                                type="tel"
                                                placeholder="+7 (999) 123-45-67"
                                                className="w-full rounded-md border border-gray-300 px-3 py-2.5 sm:py-2 text-sm sm:text-base focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.phone.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                                            Текст запроса *
                                        </label>
                                        <textarea
                                            {...register("message", {
                                                required: "Опишите вашу ситуацию",
                                                minLength: {
                                                    value: 20,
                                                    message: "Минимум 20 символов",
                                                },
                                            })}
                                            rows={5}
                                            placeholder="Расскажите, в чём заключается запрос..."
                                            className="w-full rounded-md border border-gray-300 px-3 py-2.5 sm:py-2 text-sm sm:text-base focus:ring-2 focus:ring-purple-600 focus:border-purple-600 resize-y"
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                                            Вложения (необязательно)
                                        </label>
                                        <input
                                            type="file"
                                            multiple
                                            {...register("attachments")}
                                            className="w-full rounded-md border border-dashed border-gray-300 px-3 py-2.5 sm:py-2 text-xs sm:text-sm focus:ring-2 focus:ring-purple-600 focus:border-purple-600 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                        />
                                        {attachmentsWatcher && attachmentsWatcher.length > 0 && (
                                            <p className="mt-1 text-xs sm:text-sm text-gray-500">
                                                Прикреплено файлов: {attachmentsWatcher.length}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {feedback && (
                                    <div
                                        className={`rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm ${
                                            feedback.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                        }`}
                                    >
                                        {feedback.message}
                                    </div>
                                )}

                                <div className="flex flex-col justify-center items-center space-y-3 sm:space-y-4">
                                                <button
                                                    id="submit-button"
                                                    type="submit"
                                        className={`w-full sm:w-auto text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-600 font-medium rounded-lg text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 transition ${
                                            isChecked ? "" : "opacity-50 cursor-not-allowed"
                                        } ${isSubmitting ? "animate-pulse" : ""}`}
                                        disabled={!isChecked || isSubmitting}
                                    >
                                        {isSubmitting ? "Отправка..." : "Отправить обращение"}
                                                </button>
                                    <div className="flex items-start justify-start w-full">
                                                    <input
                                                        id="link-checkbox"
                                                        type="checkbox"
                                            className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 flex-shrink-0"
                                                        onChange={handleCheckboxChange}
                                            checked={isChecked}
                                                    />
                                                    <label
                                                        htmlFor="link-checkbox"
                                            className="ms-2 sm:ms-3 text-xs sm:text-sm font-light text-gray-900 dark:text-gray-600 leading-relaxed"
                                                    >
                                                        Я подтверждаю, что ознакомлен(-а) с{" "}
                                                        <Link
                                                            onClick={downloadPDF1}
                                                            href=""
                                                className="text-blue-600 underline hover:text-blue-800"
                                                        >
                                                            Политикой обработки персональных данных
                                                        </Link>
                                                        , а также даю согласие{" "}
                                                        <Link
                                                            onClick={downloadPDF2}
                                                            href=""
                                                className="text-blue-600 underline hover:text-blue-800"
                                                        >
                                                &quot;Согласие на обработку персональных данных&quot;
                                                        </Link>{" "}
                                                        на обработку своих персональных данных в
                                                        соответствии с Федеральным законом от 27.07.2006
                                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                            &#x2116; 152-ФЗ &quot;О персональных данных&quot;. Настоящее
                                                        согласие даётся мною бессрочно.
                                                    </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Form;
