export const Logo = (props: {
  isTextHidden?: boolean;
}) => (
  <div className="flex items-center text-xl font-semibold">
    <img src="/images/ajaxicon.svg" alt="logo" className="size-10" />
    <img src="/images/logotype.png" alt="logotype" className="ml-2 hidden h-10 sm:inline" />
  </div>
);
