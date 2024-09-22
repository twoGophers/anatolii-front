import React from 'react';
import HeadComponent from '@/components/Head/Head';
import { useAppDispatch, useAppSelector } from '@/store/hooks';


export default function Companii() {
  const lang = useAppSelector((state) => state.ui.ui);


  return (
    <div className="h-screen bg-[url('/bg/sl2.jpg')] bg-no-repeat bg-cover bg-center flex justify-center relative">
        {/* CEO */}
        <HeadComponent
          title={'Наши компании'}
          description={'Мебель на заказ'}
          url={'http://localhost:3000/compania'}
        />
        {/* CEO */}
      <div className='w-11/12 lg:w-2/4 flex justify-center items-center bg-white p-8 h-fit mt-12 sticky top-10'>
        <p className='italic'>
          { lang === "RU" ? 'Мы на рынке молодые, но продвинутые. Мы видим будущее в том, что мы делаем сегодня, потому-что делаем это с душой, с наибольшей отдачей, ответственно и серьезно. Прочность, долговечность, легкий уход за мебелью из ротанга подтолкнуло нас на мысль производить ее и предлагать людям возможность отдыхать красиво и комфортно после изнурительного трудового дня. Наша мебель предназначена для дворов, террас, беседок индивидуальных домов, квартир, а также для террас кафе, баров ресторанов. Качество – это главный инструмент, который мы используем в нашей работе по производству ротанговой мебели. Главные ценности компании – это удовлетворение индивидуальных потребностей и желаний. каждого покупателя. Для него же создаем уникальные коллекции мебели из ротанга, не имеющих аналогов по соотношению цена/качество на рынке. Собственное производство позволяет выполнить любой заказ в умеренные сроки. Мы всегда открыты для установления долгосрочных взаимовыгодных отношений с надёжными партнерами. Выбирая нашу мебель, мы гарантируем качество, уют и комфорт.' : 'Suntem tineri, dar avansați pe piață. Vedem viitorul în ceea ce facem astăzi, pentru că o facem cu suflet, cu cea mai mare dăruire, cu responsabilitate și seriozitate. Rezistența, durabilitatea, ușurința de îngrijire a mobilierului din ratan ne-au îndemnat la ideea de a-l produce și de a oferi oamenilor posibilitatea de a se relaxa frumos și confortabil după o zi obositoare de muncă. Mobilierul nostru este conceput pentru curțile, terasele, pergolele caselor individuale, apartamentelor, precum și pentru terasele cafenelelor, barurilor, restaurantelor. Calitatea este principalul instrument pe care îl folosim în munca noastră în producția de mobilier din rattan. Principalele valori ale companiei sunt satisfacerea nevoilor și dorințelor individuale ale fiecărui cumpărător. Pentru el creăm colecții unice de mobilier din rattan, care nu au analogii în raportul preț/calitate pe piață. Producția noastră proprie ne permite să îndeplinim orice comandă în termeni moderați. Suntem întotdeauna deschiși să stabilim relații reciproc avantajoase pe termen lung cu parteneri de încredere. Alegând mobilierul nostru, garantăm calitate, confort și confort.' }
        </p>
      </div>
    </div>
  );
}
