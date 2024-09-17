"use client";

import { ChangeEvent, FormEvent, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import styles from "./search.module.scss";
import useMobileSearch from "@/hooks/use-mobile-search";
import { AcfOptions, Product, SearchBanner } from "@/types";
import getSearchResults from "@/actions/get-search-results";
import { PacmanLoader } from "react-spinners";
import Link from "next/link";
import Image from "next/image";
import getAcfOptions from "@/actions/get-acf-options";

// Реализация собственной функции debounce
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function Search() {
  const router = useRouter();
  const mobileSearch = useMobileSearch();
  const [results, setResults] = useState<Product[] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popular, setPopular] = useState<AcfOptions['acf']['chastye_zaprosy']>([]);
  const [searchBanner, setSearchBanner] = useState<SearchBanner | null>(null);

  useEffect(() => {
    const fetchPopular = async () => {
      const response = await getAcfOptions();
      console.log('response: ', response.acf.banner);
      setPopular(response.acf.chastye_zaprosy)
      setSearchBanner(response.acf.banner)
    }

    fetchPopular();
  }, [])

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText.length >= 3) {
      setError('');
      router.push(`/search?s=${searchText}`);
      mobileSearch.onClose();
      setIsActive(false);
    } else {
      setError('Введите более 3-х символов');
    }
  };

  const fetchProducts = async (searchText: string) => {
    setIsLoading(true)
    try {
      const response = await getSearchResults({ search: searchText, per_page: 10 });
      setResults(response);
    } catch (error) {
      setError('Ошибка поиска товаров');
    } finally {
      setIsLoading(false)
    }
  };

  // Используем debounce для функции fetchProducts
  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 1000), []);

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedFetchProducts(value);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = (e: { currentTarget: { contains: (arg0: any) => any }; relatedTarget: any }) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setTimeout(() => {
        setIsActive(false);
      }, 1000)
    }
  };

  return (
    <form className={styles.search} onSubmit={onSearch}>
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="28"
          viewBox="0 0 29 28"
          fill="none"
        >
          <path
            opacity="0.7"
            d="M13.9168 24.5C20.038 24.5 25.0002 19.5379 25.0002 13.4167C25.0002 7.29555 20.038 2.33337 13.9168 2.33337C7.79567 2.33337 2.8335 7.29555 2.8335 13.4167C2.8335 19.5379 7.79567 24.5 13.9168 24.5Z"
            stroke="#060F2F"
            strokeWidth="2"
          />
          <path
            d="M22.0835 21.5834L26.1668 25.6667"
            stroke="#060F2F"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="relative flex-auto">
        <input
          type="search"
          name="search"
          placeholder="Поиск"
          value={searchText}
          onChange={handleChangeSearchText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full"
          autoComplete="off"
        />
        <div className="absolute top-1/2 right-14 -translate-y-1/2 text-main">
          {isLoading && <PacmanLoader size={15} color="#2972ff" />}
        </div>
      </div>

      {isActive && (
        <div className={styles.searchResults}>
          {results && (
            <div className="mb-5">
              <h5>Результаты поиска</h5>
              <ul className="mb-3">
                {results.map((item: Product) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => router.push(`/product/${item.slug}`)}>{item.name}</button>
                  </li>
                ))}
              </ul>
              {!results.length && <p>Ничего не найдено</p>}
              {!!results.length && <button onClick={() => {
                router.push(`/search?s=${searchText}`);
                mobileSearch.onClose()
              }} className="text-main">Показать все результаты</button>}
            </div>
          )}
          <div className="mb-5">
            <h5>Популярные запросы</h5>
            <ul>
              {popular.map(item => (
                <li key={item.zagolovok}>
                  <Link href={item.ssylka}>{item.zagolovok}</Link>
                </li>
              ))}
            </ul>
            {searchBanner !== null && (
              <div className="mt-10 w-full max-w-96 h-52 rounded-lg overflow-hidden">
                <Link href={searchBanner.ssylka} className="relative block w-full h-full">
                  <Image src={searchBanner.banner.url} alt="logo" fill />
                </Link>
              </div>
            )}

          </div>
        </div>
      )
      }
    </form >
  );
}
