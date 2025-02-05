import { THEMES } from "../constant";
import { useThemeStore } from "../store/useThemeStore";

const Setting = () => {

  const {theme,setTheme} = useThemeStore()

  return (
    <div className="min-h-screen container max-w-5xl mx-auto pt-20 px-10">
      <div className="space-y-3 mb-10">
        <h1 className="text-2xl font-bold">Theme </h1>
        <p className="text-base-content/60 font-medium">
          Choose the theme you want to use
        </p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 ">
        {THEMES.map((t: string) => (
          <button className={`
            group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
            ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
          `} key={t} onClick={()=>setTheme(t)} >
            <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                <div className="bg-primary rounded"></div>
                <div className="bg-secondary rounded"></div>
                <div className="bg-accent rounded"></div>
                <div className="bg-neutral rounded"></div>
              </div>
            </div>

              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase()+t.slice(1)}
              </span>
          </button>
        ))}
      </div>


      <div>
        hi
      </div>
    </div>
  );
};

export default Setting;
