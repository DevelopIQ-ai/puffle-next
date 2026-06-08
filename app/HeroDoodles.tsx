import Image from "next/image";

export default function HeroDoodles() {
  return (
    <div className="hero-doodles" aria-hidden="true">
      <Image
        className="hero-doodle hero-doodle-lamp"
        src="/doodles/hero-lamp.png"
        alt=""
        width={711}
        height={1186}
        priority
      />
      <Image
        className="hero-doodle hero-doodle-tunnel"
        src="/doodles/hero-tunnel.png"
        alt=""
        width={1189}
        height={940}
        priority
      />
    </div>
  );
}
