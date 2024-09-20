import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Catalog } from "@/typescript";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { showMobileMenuLink } from "@/store/slices/ui";

export default function Navigation() {
  const catalogAll = useAppSelector((state) => state.catalog.catalogAll as Catalog[]);
  const lang = useAppSelector((state) => state.ui.ui);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleToggle = (index: number, item: any) => {
    setOpenIndex(openIndex === index ? null : index);
    if (item.title) {
      localStorage.setItem("catalogNameRU", item.title);
      localStorage.setItem("catalogNameMD", item.titleMD);
    }
  };

  const handleToggleSub = (subItem: any) => {
    if (subItem.name) {
      localStorage.setItem("catalogNameRU", subItem.name);
      localStorage.setItem("catalogNameMD", subItem.nameMD);
    }
  };

  useEffect(() => {
    const currentUrl = router.query.url as string;
    catalogAll.forEach((item, index) => {
      if (item.url === currentUrl) {
        setOpenIndex(index);
      } else {
        item.items.forEach((subItem: any) => {
          if (subItem.url === currentUrl) {
            setOpenIndex(index);
          }
        });
      }
    });
  }, [router.query.url, catalogAll]);

  return (
    <div>
      <ul className="text-[#727272]">
        {catalogAll.map((item, index) => (
          <li key={index} className="border-gray-300">
            <div
              className="flex justify-between items-start py-2 cursor-pointer relative"
              onClick={() => handleToggle(index, item)}
            >
              <Link
                href={`/catalog/${item.url}`}
                onClick={() => dispatch(showMobileMenuLink(false))}
              >
                <span
                  className={`text-base ${
                    item.url === router.query.url ? "text-black font-semibold" : ""
                  }`}
                >
                  {lang === "RU" ? item.catalog : item.catalogMD}
                </span>
              </Link>
              {item.items.length > 0 && (
                <span className="h-full w-10 absolute right-0 top-0 flex justify-center items-center rounded-sm">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3 rotate-icon ${openIndex === index ? "open" : ""}`}
                  />
                </span>
              )}
            </div>
            <div
              className={`accordion-content ${openIndex === index ? "open animation-nav" : ""}`}
            >
              {item.items && (
                <ul className="pl-4">
                  {item.items.map((subItem: any) => (
                    <li
                      key={subItem.url}
                      className={`text-base py-1 ${
                        subItem.url === router.query.url ? "text-black font-semibold" : ""
                      }`}
                    >
                      <Link
                        href={`/catalog/${subItem.url}`}
                        onClick={() => dispatch(showMobileMenuLink(false))}
                      >
                        {lang === "RU" ? subItem.name : subItem.nameMD}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
