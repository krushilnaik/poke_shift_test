interface Props {
  data: string[];
}

function TypeEffectiveness({ data }: Props) {
  const [type, multiplier] = data;

  return (
    <div className="flex flex-row border-[1px] border-white/30 rounded-lg bg-white/50">
      <div className="text-sm bg-black/20 p-1">{multiplier}</div>
      <div className="text-sm p-1">{type}</div>
    </div>
  );
}

export default TypeEffectiveness;
