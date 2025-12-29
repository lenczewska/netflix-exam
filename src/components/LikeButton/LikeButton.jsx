import { useEffect, useState } from "react";

const LikeSVG = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="m13.407 6.256-.094-.752A2.86 2.86 0 0 0 10.476 3a.476.476 0 0 0-.476.476v3.237a1 1 0 0 1-.152.53l-1.94 3.105a2 2 0 0 1-1.147.863l-2.036.582a1 1 0 0 0-.725.961v5.562c0 .378.306.684.684.684 1.19 0 2.36.31 3.393.901L8.25 20a7.6 7.6 0 0 0 3.766 1H16.5a1.5 1.5 0 0 0 1.118-2.5H18a1.5 1.5 0 0 0 .787-2.777 1.5 1.5 0 0 0-.287-2.973h-.17A1.499 1.499 0 0 0 17.5 10h-4.375l.282-2.256a6 6 0 0 0 0-1.488"
    />
  </svg>
);

const DoubleLikeSVG = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="m17.31 2.5.1.76a6 6 0 0 1 0 1.48L17.12 7h4.38a1.5 1.5 0 0 1 .83 2.75h.17a1.5 1.5 0 0 1 .29 2.97A1.5 1.5 0 0 1 22 15.5h-.38q.37.42.38 1c0 .83-.67 1.5-1.5 1.5h-2.58a3.5 3.5 0 0 0-.93-3.21l.01-.29a3.5 3.5 0 0 0-3.5-3.5h-2.1a8 8 0 0 0 0-2l-.1-.74-1.24.15 1.24-.15-.04-.27a2 2 0 0 0 .65-.64l1.94-3.1A1 1 0 0 0 14 3.7V.48c0-.27.21-.48.48-.48a2.86 2.86 0 0 1 2.83 2.5m-8 6 .1.76a6 6 0 0 1 0 1.48L9.12 13h4.38a1.5 1.5 0 0 1 .83 2.75h.17a1.5 1.5 0 0 1 .29 2.97A1.5 1.5 0 0 1 14 21.5h-.38q.37.42.38 1c0 .83-.67 1.5-1.5 1.5H8.02a7.6 7.6 0 0 1-3.77-1l-.17-.1a7 7 0 0 0-3.4-.9.7.7 0 0 1-.68-.68v-5.57a1 1 0 0 1 .73-.96l2.03-.58a2 2 0 0 0 1.15-.86l1.94-3.1A1 1 0 0 0 6 9.7V6.48c0-.27.21-.48.48-.48A2.86 2.86 0 0 1 9.3 8.5"
    />
  </svg>
);

const DislikeSVG = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="m10.593 17.744.094.752A2.86 2.86 0 0 0 13.524 21a.476.476 0 0 0 .476-.476v-3.237a1 1 0 0 1 .152-.53l1.94-3.105a2 2 0 0 1 1.147-.863l2.036-.582a1 1 0 0 0 .725-.961V5.684A.684.684 0 0 0 19.316 5c-1.19 0-2.36-.31-3.393-.901L15.75 4a7.6 7.6 0 0 0-3.766-1H7.5a1.5 1.5 0 0 0-1.118 2.5H6a1.5 1.5 0 0 0-.787 2.777A1.5 1.5 0 0 0 5.5 11.25h.17A1.499 1.499 0 0 0 6.5 14h4.375l-.282 2.256a6 6 0 0 0 0 1.488"
    />
  </svg>
);

const LikeButton = ({ uniqueId }) => {
  const STORAGE_KEY = "card-reactions";
  const [active, setActive] = useState(null);

  const reactions = [
    { id: "like", icon: <LikeSVG />, color: "text-white" },
    { id: "double", icon: <DoubleLikeSVG />, color: "text-white" },
    { id: "dislike", icon: <DislikeSVG />, color: "text-white" },
  ];

  // Загружаем реакцию для конкретной карточки
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (saved[uniqueId]) {
      setActive(saved[uniqueId]);
    }
  }, [uniqueId]);

  // Сохраняем реакцию для конкретной карточки
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (active) {
      saved[uniqueId] = active;
    } else {
      delete saved[uniqueId];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [active, uniqueId]);

  const handleClick = (id) => {
    setActive((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative group">
      <button
        className={`w-[40px] h-[40px] flex items-center justify-center rounded-full
        border-2 bg-[#222121] z-10 transition-all`}
      >
        {active ? reactions.find((r) => r.id === active)?.icon : <LikeSVG />}
      </button>

      <div
        className="absolute left-0 top-0 flex gap-[6px]
                      opacity-0 pointer-events-none translate-x-[-4px]
                      group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0
                      transition-all duration-300 ease-in-out"
      >
        {reactions.map((reaction) => (
          <button
            key={reaction.id}
            onClick={() => handleClick(reaction.id)}
            className={`w-[40px] h-[40px] flex items-center justify-center rounded-full
            border-2 bg-[#222121] transition-all
            ${
              active === reaction.id
                ? "border-white " + reaction.color
                : "border-[#616161] text-[#aaa] hover:border-white"
            }`}
          >
            {reaction.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LikeButton;
