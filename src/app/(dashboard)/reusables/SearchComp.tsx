interface Props {
  value?: string;
  handlesearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classStyle?: string;
  placeholder?: string;
}

export const SearchComp = (props: Props) => {
  const { value, handlesearch, classStyle, placeholder } = props;
  return (
    <div className="w-full">
      <div className={`flex ${classStyle}`}>
        <img src="/svg/searchIcon.svg" alt="search-icon" />
        <input
          type="text"
          placeholder={placeholder}
          className="ml-5 w-full border-l-2 pl-2 outline-none"
          value={value}
          onChange={handlesearch}
        />
      </div>
    </div>
  );
};
