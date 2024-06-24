"use client";
import React, { useState } from "react";
import "@/components/styles/Anket.scss";

type Votes = {
  [key: string]: number;
};

function Anket() {
  const [selectedOption, setSelectedOption] = useState("");
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState<Votes>({
    "1": 13,
    "2": 8,
    "3": 8,
    "4": 3,
    "5": 25,
    "6": 11,
    "7": 9,
    "8": 58,
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!voted) {
      const value = event.target.value;
      setSelectedOption(value);
    }
  };

  const handleVote = () => {
    if (selectedOption !== "") {
      setVoted(true);
      const updatedVotes = { ...votes };
      updatedVotes[selectedOption]++;
      setVotes(updatedVotes);
    } else {
      alert("Пожалуйста, выберите вариант ответа перед голосованием.");
    }
  };

  return (
    <section className="section2 bg relative h-max">
      <div className="flex flex-col items-center justify-center">
        {/* Text for small screens */}
        <div className="md:hidden flex flex-col items-center mt-4">
          <p className="text-4xl font-bold mb-4 text-center">
            С чем у вас <br />
            ассоциируется <br />
            Санкт-Петербург?
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8 items-center">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border-2 border-gray-300 w-full md:w-192 relative my-6 md:my-12">
            <div className="space-y-4">
              {Object.keys(votes).map((option) => (
                <div key={option}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      className="form-radio h-4 w-4 text-purple-600"
                      onChange={handleOptionChange}
                      checked={selectedOption === option}
                      disabled={voted}
                    />
                    <span className="text-sm">{getOptionLabel(option)}</span>
                  </label>
                  {voted && (
                    <>
                      <div className="relative h-2 bg-gray-200 rounded">
                        <div
                          className="absolute top-0 left-0 h-full bg-purple-600 rounded"
                          style={{
                            width: `${(votes[option] / Object.values(votes).reduce((a, b) => a + b, 0)) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                        <span>
                          {votes[option]} (
                          {(
                            (votes[option] /
                              Object.values(votes).reduce((a, b) => a + b, 0)) *
                            100
                          ).toFixed(2)}
                          %)
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            {!voted && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleVote}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Голосовать
                </button>
              </div>
            )}

            {voted && (
              <div className="text-center text-gray-700 mt-4">
                Спасибо за ваш голос!
              </div>
            )}
          </div>

          {/* Vertical line */}
          <div className="hidden md:flex w-2 bg-black h-96"></div>

          <div className="hidden md:flex flex-col items-start ml-4 mt-4">
            <p className="text-4xl font-bold mb-4 text-left mt-12">
              С чем у вас <br />
              ассоциируется <br />
              Санкт&#8209;Петербург?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function getOptionLabel(option: string) {
  switch (option) {
    case "1":
      return "Казанский собор";
    case "2":
      return "Исаакиевский собор";
    case "3":
      return "Эрмитаж";
    case "4":
      return "Медный Всадник";
    case "5":
      return "Растральная колона";
    case "6":
      return "Мариинский театр";
    case "7":
      return "Крейсер Аврора";
    case "8":
      return "Разводные мосты";
    default:
      return "";
  }
}

export default Anket;
