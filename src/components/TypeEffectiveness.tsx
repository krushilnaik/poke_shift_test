interface Props {
  type: string;
  multiplier: string;
  backgroundColor: string;
}

function TypeEffectiveness({ type, multiplier, backgroundColor }: Props) {
  return (
    <div
      className="flex flex-row border-[1px] border-white/30 rounded-lg"
      style={{ backgroundColor }}
    >
      <div className="text-sm bg-black/20 p-1">{multiplier}</div>
      <div className="text-sm p-1">{type}</div>
    </div>
  );
}

export default TypeEffectiveness;
