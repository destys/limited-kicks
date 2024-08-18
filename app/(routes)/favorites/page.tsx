import Crumbs from '@/components/crumbs/crumbs'
import FavoritesList from './components/favorites-list/favorites-list';

export async function generateMetadata() {
    return {
        title: "Избранное",
        description: "Страница избранного",
    }
}

const FavoritesPage = () => {
    return (
        <section>
            <Crumbs data={{ title: { rendered: 'Избранное' } }} />
            <h1 className="mb-10 uppercase text-center lg:text-left">Избранное</h1>
            <FavoritesList />
        </section>
    )
}

export default FavoritesPage