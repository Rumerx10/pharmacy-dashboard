"use client";
import { useGetData, WsURL } from "@/api/api";
import { useEffect, useMemo, useState } from "react";
import TiSvg from "@/svg/TiSvg";
import IiSvg from "@/svg/IiSvg";
import AiSvg from "@/svg/AiSvg";
import Ii2Svg from "@/svg/Ii2Svg";
import Ai2Svg from "@/svg/Ai2Svg";
import Ti2Svg from "@/svg/Ti2Svg";
import SoiSvg from "@/svg/SoiSvg";
import Soi2Svg from "@/svg/Soi2Svg";
import FrSvg from "@/svg/FrSvg";
import Fr2Svg from "@/svg/Fr2Svg";
import EsSvg from "@/svg/EsSvg";
import Es2Svg from "@/svg/Es2Svg";
import EiSvg from "@/svg/EiSvg";
import Ei2Svg from "@/svg/Ei2Svg";
import NaiSvg from "@/svg/NaiSvg";
import Nai2Svg from "@/svg/Nai2Svg";
import useWebSocket from "@/hooks/useWebSocket";
import { DashboardCardDataType, DashboardDataType } from "@/types/types";
import { Card } from "../ui/card";
import { LuNotebookPen } from "react-icons/lu";
import { BsClipboard2Pulse } from "react-icons/bs";
import DashboardCardDetails from "./DashboardCardDetails";

const DashboardCards = ({
  setConnectionStatus,
}: {
  setConnectionStatus: (
    value: "connecting" | "connected" | "disconnected",
  ) => void;
  currentPage?: number;
  pageSize?: number;
}) => {
  const [realTimeData, setRealTimeData] = useState<DashboardDataType | null>(
    null,
  );
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const {
    data: dashboardData,
    isPending: isLoadingDashboard,
    error: dashboardError,
  } = useGetData(["dashboardData"], "/get-dash-summery?performBy=&appId=1#");

  const { connectionStatus } = useWebSocket(
    WsURL,
    "/topic/refresh",
    setRealTimeData,
  );

  useEffect(() => {
    setConnectionStatus(connectionStatus);
  }, [connectionStatus, setConnectionStatus]);

  const displayData = realTimeData || dashboardData?.data;
  console.log("Display Data :::: ", displayData)

  const cardData = useMemo(
    (): DashboardCardDataType[] => [
      {
        id: "TI",
        cardTitle: "Total Items",
        number: displayData?.totalItem ?? 0,
        percent: "+3.75%",
        fIcon: <TiSvg />,
        bIcon: <Ti2Svg />,
        fIconBg: "#059669",
      },
      {
        id: "AI",
        cardTitle: "Active Items",
        number: displayData?.activeItem ?? 0,
        percent: "+3.75%",
        fIcon: <AiSvg />,
        bIcon: <Ai2Svg />,
        fIconBg: "#4E4482",
      },
      {
        id: "NI",
        cardTitle: "Inactive Items",
        number: displayData?.inactiveItem ?? 0,
        percent: "+3.75%",
        fIcon: <IiSvg />,
        bIcon: <Ii2Svg />,
        fIconBg: "#E62B66",
      },
      {
        id: "IP",
        cardTitle: "IPD Prescription Sales (Amount)",
        number: displayData?.ipdItem ?? 0,
        percent: "+3.75%",
        fIcon: <LuNotebookPen size={26} color="white" />,
        bIcon: (
          <LuNotebookPen
            size={120}
            color="#1398B9"
            className="opacity-10 dark:opacity-100"
          />
        ),
        fIconBg: "#1398B9",
      },
      {
        id: "OP",
        cardTitle: "OPD Sales (Amount)",
        number: displayData?.opdItem ?? 0,
        percent: "+3.75%",
        fIcon: <BsClipboard2Pulse size={26} color="white" />,
        bIcon: (
          <BsClipboard2Pulse
            size={120}
            color="#0570A7"
            className="opacity-10 dark:opacity-100"
          />
        ),
        fIconBg: "#E62B66",
      },
      {
        id: "SO",
        cardTitle: "Stock Out Items",
        number: displayData?.stockOutItem ?? 0,
        percent: "+3.75%",
        fIcon: <SoiSvg />,
        bIcon: <Soi2Svg />,
        fIconBg: "#F5B110",
      },
      {
        id: "NA",
        cardTitle: "Newly Added Items",
        number: displayData?.newlyAddedItem ?? 0,
        percent: "-3.75%",
        fIcon: <NaiSvg />,
        bIcon: <Nai2Svg />,
        fIconBg: "#1398B9",
      },
      {
        id: "RI",
        cardTitle: "For Reorder",
        number: displayData?.reorderItem ?? 0,
        percent: "-3.75%",
        fIcon: <FrSvg />,
        bIcon: <Fr2Svg />,
        fIconBg: "#589355",
      },
      {
        id: "ES",
        cardTitle: "Expiring Soon",
        number: displayData?.expireSoon ?? 0,
        percent: "+3.75%",
        fIcon: <EsSvg />,
        bIcon: <Es2Svg />,
        fIconBg: "#E16E37",
      },
      {
        id: "EI",
        cardTitle: "Expired Items",
        number: displayData?.expireItem ?? 0,
        percent: "-3.75%",
        fIcon: <EiSvg />,
        bIcon: <Ei2Svg />,
        fIconBg: "#E13737",
      },
    ],
    [displayData],
  );

  const handleCardClick = (card: { id: string; title: string }) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="relative">
      <section className="space-y-4 px-4 lg:px-40">
        {dashboardError ? (
          <div className="flex items-center justify-center h-40 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <div className="text-red-600 dark:text-red-400 text-center">
              <p className="font-semibold">Error loading data</p>
              <p className="text-sm">Please try again later</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            {cardData.map((item, index) => (
              <Card
                key={`${item.id}-${index}`}
                className="relative bg-white dark:bg-gray-800 h-full min-h-[150px] border rounded-lg overflow-hidden group transform transition-transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                onClick={() =>
                  handleCardClick({ id: item.id, title: item.cardTitle })
                }
              >
                <div className="absolute right-0 bottom-0 opacity-100 dark:opacity-5 group-hover:opacity-90 transition-opacity duration-300">
                  {item.bIcon}
                </div>
                <div className="absolute top-8 right-6">
                  <div
                    style={{ backgroundColor: item.fIconBg }}
                    className="p-4 rounded-full group-hover:opacity-90 transition-opacity duration-300"
                  >
                    {item.fIcon}
                  </div>
                </div>
                <div className="absolute inset-0 flex justify-between px-6 py-8 bg-transparent rounded-lg w-full shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div>
                    <h1 className="text-sm mb-4 font-medium text-[#6B7280] dark:text-gray-400 line-clamp-2">
                      {item.cardTitle}
                    </h1>
                    {isLoadingDashboard ? (
                      <div className="h-14 flex items-center">
                        <p className="text-gray-400 dark:text-gray-500 animate-pulse">
                          Loading...
                        </p>
                      </div>
                    ) : (
                      <h1 className="text-5xl font-semibold text-[#334155] dark:text-gray-100 whitespace-nowrap">
                        {item.number}
                      </h1>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {isModalOpen && selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          <div className="relative w-full max-w-6xl h-full max-h-[90vh]">
            <DashboardCardDetails
              card={selectedCard}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCards;
