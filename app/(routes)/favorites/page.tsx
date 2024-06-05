import Crumbs from '@/components/crumbs/crumbs'
import FavoritesList from './components/favorites-list/favorites-list'

const FavoritesPage = () => {


    return (
        <section>
            <Crumbs data={{ title: { rendered: 'Избранное' } }} />
            <h1 className="mb-10 uppercase">Избранное</h1>
            <FavoritesList />
        </section>
    )
}

export default FavoritesPage