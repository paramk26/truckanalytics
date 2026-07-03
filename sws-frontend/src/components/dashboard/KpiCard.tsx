import { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    value: string | number;
    subtitle: string;
    icon: LucideIcon;
    color: string;
}

export default function KpiCard({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
}: Props) {
    return (
        <div
            className="
            bg-white
            rounded-[28px]
            p-6
            shadow-sm
            border
            border-[#ECEEF3]
            transition-all
            hover:shadow-md
            "
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-4xl font-semibold mt-4">
                        {value}
                    </h2>

                    <p className="text-sm text-gray-400 mt-2">
                        {subtitle}
                    </p>
                </div>

                <div
                    className="
                    w-14
                    h-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    "
                    style={{
                        backgroundColor: `${color}20`,
                    }}
                >
                    <Icon
                        size={28}
                        color={color}
                    />
                </div>
            </div>
        </div>
    );
}