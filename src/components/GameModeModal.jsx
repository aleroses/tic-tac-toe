import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { getRandomCharacter } from "../logic/ai";
import { LEVELS } from "../constants";
import { Logo } from "./Logo";

export const GameModeModal = () => {
  const { state, dispatch } = useContext(GameContext);

  const selectPVP = () => {
    dispatch({
      type: "SET_GAME_MODE",
      payload: { mode: "PVP" },
    });
  };

  const selectPVC = (level) => {
    // const computerCharacter = getRandomCharacter(
    //   state.player1
    // );

    dispatch({
      type: "SET_GAME_MODE",
      payload: {
        mode: "PVC",
        aiLevel: level,
        // computerCharacter,
      },
    });
  };

  return (
    <>
      <section className="mb-16 flex flex-col gap-4">
        <Logo />
        <div
          className="animate-rotate-border w-full max-w-lg rounded-2xl bg-conic/[from_var(--border-angle)] from-[#42b132] via-[#009cda] to-[#fcd000] p-[0.1rem]"
          // className='winner'
          role="dialog"
          aria-modal="true"
        >
          <div className="flex w-full flex-col gap-8 rounded-2xl bg-gray-950 p-6 dark:bg-[#090b10]">
            <div>
              <h2 className="pb-2 text-2xl">Select Game Mode</h2>

              <button
                className="cursor-pointer rounded-2xl border border-white/20 bg-black/40 px-4 py-2 text-[0.8rem] text-white backdrop-blur-2xl transition hover:bg-black/60"
                onClick={selectPVP}
              >
                Player vs Player
              </button>
            </div>

            <div className="rounded-2xl border border-white/20 bg-black/40 px-4 py-2 text-[0.8rem] text-white backdrop-blur-2xl transition hover:bg-black/50">
              <h2 className="pb-2">Player vs Computer</h2>

              <div className="flex justify-between gap-2">
                {LEVELS.map((item, index) => (
                  <button
                    key={item.level}
                    className="cursor-pointer rounded-2xl border border-white/20 bg-black/40 px-4 py-2 text-[0.8rem] text-white capitalize backdrop-blur-2xl transition hover:bg-black/60"
                    onClick={() => selectPVC(item.level)}
                  >
                    {item.level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
