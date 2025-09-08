import { playLists, recommendedPlaylists } from "@/data/mock";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import { recentSongs } from "../data/mock";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />

      <Text style={styles.sectionTitle}>Your top mixes</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {recommendedPlaylists.map((item) => (
          <TouchableOpacity style={styles.mixCard} key={item.id}>
            <Image source={item.image} style={styles.mixImage} />
            <Text style={styles.mixTitle}>{item.title}</Text>
            <Text style={styles.mixSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Your recent songs</Text>
      <View style={styles.songSection}>
        {recentSongs.slice(0, 3).map((a) => (
          <View key={a.id} style={styles.songItem}>
            <Image source={a.cover} style={styles.songImg} />
            <View>
              <Text style={styles.songTitle}>{a.title}</Text>
              <Text style={styles.songSub}>{a.artist}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>New released albums</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {playLists.map((album) => (
          <TouchableOpacity key={album.id} style={styles.albumCard}>
            <Image source={album.cover} style={styles.albumImage} />
            <Text style={styles.albumTitle}>{album.playlistTitle}</Text>
            <Text style={styles.albumArtist}>{album.artist}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    color: "#fff",
  },
  horizontalScroll: {
    paddingLeft: 16,
  },
  mixCard: {
    width: 160,
    marginRight: 16,
  },
  mixImage: {
    width: 160,
    height: 160,
    borderRadius: 8,
  },
  mixTitle: {
    fontWeight: "600",
    marginTop: 8,
    color: "#fff",
  },
  mixSubtitle: {
    fontSize: 12,
    color: "#fff",
  },
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 12,
  },
  recentImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
  },
  recentTitle: {
    fontWeight: "600",
  },
  recentArtist: {
    fontSize: 12,
    
  },
  songSection: {
    gap: 16,
    marginTop: 12,
    marginBottom: 32,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
  },
  songImg: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  songTitle: {
    fontWeight: "600",
    color: "#fff",
  },
  songSub: {
    fontSize: 12,
    color: "#999",
  },
  albumCard: {
    width: 100,
    marginRight: 16,
    paddingBottom: 40,
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  albumTitle: {
    fontWeight: "600",
    marginTop: 8,
    color: "#fff",
  },
  albumArtist: {
    fontSize: 12,
    color: "#777",
  },
});
