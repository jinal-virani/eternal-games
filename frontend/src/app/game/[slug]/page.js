import GamePageClient from './gamePageClientSide'
import gameService from '../../../services/game.service'
import { redirect } from 'next/navigation'

export default async function Page({ params }) {
  const { slug } = params

  try {
    const gameResponse = await gameService.getGame(slug)
    const sideGamesResponse = await gameService.getGameList()

    if (!gameResponse || !gameResponse.game) {
      return redirect('/')
    }

    const filteredSideGames = sideGamesResponse?.games?.filter(g => g?.slug !== slug) || []

    return (
          <GamePageClient
              game={gameResponse.game}
              description={gameResponse.data?.description || ''}
              sideGames={filteredSideGames}
              slug={slug}
          />
    )
  } catch (error) {
    redirect('/')
    console.error(error)
  }
}
