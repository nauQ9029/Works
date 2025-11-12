import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Define product type
interface Product {
    id: string;
    name: string;
    price: string;
    rating: string;
    reviews: string;
    image: string;
}

const products: Product[] = [
    {
        id: "1",
        name: "Ắc quy",
        price: "240.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://acquythanhnguyen.com/upload/sanpham/dongnai-ptz5l-3240.jpg",
    },
    {
        id: "2",
        name: "Lốp Sau",
        price: "230.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://phutungxemaybienhoa.com/wp-content/uploads/2021/07/lop-xe-sau-may-honda.jpg",
    },
    {
        id: "3",
        name: "Lốp Trước",
        price: "190.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://headhongdac.com/upload/sanpham/large/lop-truoc-1596852166-abfcfa.jpg",
    },
    {
        id: "4",
        name: "Xích",
        price: "180.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://bizweb.dktcdn.net/thumb/grande/100/183/197/products/mo4.jpg?v=1617357723893",
    },
    {
        id: "5",
        name: "Dầu Nhớt",
        price: "80.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/341/465/products/z5058351075505-ec66e87a5640a3a14c3ad56557a9d819.jpg?v=1722664921033",
    },
    {
        id: "6",
        name: "Nước Mát",
        price: "65.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://vn-test-11.slatic.net/p/1eb3d5e50b8ec5a2c15eae294f33b80b.jpg",
    },
    {
        id: "7",
        name: "Ắc quy",
        price: "240.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://acquythanhnguyen.com/upload/sanpham/dongnai-ptz5l-3240.jpg",
    },
    {
        id: "88",
        name: "Lốp Sau",
        price: "230.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://phutungxemaybienhoa.com/wp-content/uploads/2021/07/lop-xe-sau-may-honda.jpg",
    },
    {
        id: "9",
        name: "Lốp Trước",
        price: "190.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://headhongdac.com/upload/sanpham/large/lop-truoc-1596852166-abfcfa.jpg",
    },
    {
        id: "10",
        name: "Xích",
        price: "180.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://bizweb.dktcdn.net/thumb/grande/100/183/197/products/mo4.jpg?v=1617357723893",
    },
    {
        id: "11",
        name: "Dầu Nhớt",
        price: "80.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/341/465/products/z5058351075505-ec66e87a5640a3a14c3ad56557a9d819.jpg?v=1722664921033",
    },
    {
        id: "12",
        name: "Nước Mát",
        price: "65.000VND",
        rating: "5.0",
        reviews: "100 Đánh Giá",
        image: "https://vn-test-11.slatic.net/p/1eb3d5e50b8ec5a2c15eae294f33b80b.jpg",
    },
];

export default function ReplacementPartsScreen() {
    const router = useRouter();

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.productRating}>⭐ {item.rating}</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
                <Text style={styles.viewMoreText}>Xem Thêm</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={26} color="#fff" />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Tìm Kiếm"
                        style={styles.searchInput}
                    />
                </View>

                {/* Title */}
                <Text style={styles.title}>Phụ tùng thay thế</Text>

                {/* Product Grid */}
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.productGrid}
                />

                {/* Bottom Navigation */}
                <BottomNavigation activeTab="spareParts" />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#888',
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 30,
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
    },

    // Title
    title: {
        fontSize: 30,
        fontWeight: '400',
        color: 'white',
        marginHorizontal: 16,
        marginBottom: 10,
    },

    // Product Grid
    productGrid: {
        padding: 10,
    },

    // Product Card
    productCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 8,
        padding: 10,
        alignItems: 'center',
    },
    productImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    productName: {
        fontWeight: '600',
        fontSize: 16,
        marginTop: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#333',
        marginVertical: 2,
    },
    productRating: {
        fontSize: 12,
        color: 'gray',
    },
    viewMoreButton: {
        backgroundColor: '#888',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 8,
    },
    viewMoreText: {
        color: '#fff',
    },
});
