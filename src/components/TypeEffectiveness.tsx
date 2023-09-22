interface Props {
  type: string;
  multiplier: string;
  backgroundColor: string;
}

function TypeEffectiveness({ type, multiplier, backgroundColor }: Props) {
  return (
    <div className="flex w-[6rem] border-white/30 rounded-lg" style={{ backgroundColor }}>
      <div className="text-sm bg-black/20 p-1">{multiplier}</div>
      <div className="text-sm mx-auto p-1">{type}</div>
    </div>
  );
}

export default TypeEffectiveness;
