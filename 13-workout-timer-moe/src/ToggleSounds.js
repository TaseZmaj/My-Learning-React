import { memo } from "react";

//ova e standardno
// const ToggleSounds = memo(({ allowSound, setAllowSound }) =>{
//   return (
//     <button
//       className="btn-sound"
//       onClick={() => setAllowSound((allow) => !allow)}
//     >
//       {allowSound ? "🔈" : "🔇"}
//     </button>
//   );
// });
// export default ToggleSounds;

//NO, vaka e poubavo
function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}
//tuka stavash memo
export default memo(ToggleSounds);
