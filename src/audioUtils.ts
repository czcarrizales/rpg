import select from '../public/sounds/select.mp3'
import adventure from '../public/music/delightful_adventure.mp3'
import daemons from '../public/music/world/daemons.mp3'
import boss1 from '../public/music/boss1.mp3'
import boss2 from '../public/music/boss2.mp3'
import lordOfTheCastle from '../public/music/boss/lord-of-the-castle.mp3'
import theCorrupted from '../public/music/boss/the-corrupted.mp3'
import edgeOfExistence from '../public/music/world/edge-of-existence.mp3'
import danceToTheDeath from '../public/music/world/dance-to-the-death.mp3'
import beach from '../public/music/world/beach.mp3'
import squirmingEvil from '../public/music/boss/squirmingEvil.mp3'
import monstrousMonstro from '../public/music/world/monstrousMonstro.mp3'
import tensionRising from '../public/music/boss/tensionRising.mp3'
import scherzo from '../public/music/world/scherzo.mp3'
import the13thReflection from '../public/music/boss/the13thReflection.mp3'
import equipmentAppears from '../public/sounds/equipmentAppears.mp3'
import treasureAppears from '../public/sounds/treasureAppears.mp3'

const soundsAndMusic = {
    selectSound: new Audio(select),
    adventureMusic:new Audio(adventure),
    deamonsMusic: new Audio(daemons),
    boss1Music: new Audio(boss1),
    boss2Music: new Audio(boss2),
    lordOfTheCastleMusic: new Audio(lordOfTheCastle),
    theCorruptedMusic: new Audio(theCorrupted),
    edgeOfExistenceMusic: new Audio(edgeOfExistence),
    danceToTheDeathMusic: new Audio(danceToTheDeath),
    beachMusic: new Audio(beach),
    squirmingEvilMusic: new Audio(squirmingEvil),
    monstrousMonstroMusic: new Audio(monstrousMonstro),
    tensionRisingMusic: new Audio(tensionRising),
    scherzoMusic: new Audio(scherzo),
    the13thReflectionMusic: new Audio(the13thReflection),
    equipmentAppearsSound: new Audio(equipmentAppears),
    treasureAppearsSound: new Audio(treasureAppears)
}

export default soundsAndMusic