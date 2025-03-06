export const Preloader = () => (
  <div className="w-full h-full flex justify-center items-center">
    <svg
      className={"animate-spin"}
      width="23"
      height="24"
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.8998 20.5674C17.0128 22.0891 14.6128 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C16.3394 1 20.092 3.51274 21.882 7.1626C22.1343 6.93072 22.3965 6.70952 22.668 6.49969C20.6735 2.63912 16.645 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C14.761 24 17.3043 23.0675 19.332 21.5003C19.1751 21.1967 19.0308 20.8855 18.8998 20.5674Z"
        fill="#E9E9E9"
      />
    </svg>
  </div>
);
