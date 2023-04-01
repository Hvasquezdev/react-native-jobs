import React, { useState } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";

import { COLORS, icons, SIZES } from "../../constants";
import { NearbyJobCard, ScreenHeaderBtn } from "../../components";
import useFetch from "../../hooks/useFetch";
import styles from "../../styles/search";

const JobSearch = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [page, setPage] = useState(1);

  const { isLoading, data, error, refetch } = useFetch({
    endpoint: "search",
    params: {
      query: params.id,
      page: page.toString(),
    },
  });

  const handlePagination = (direction = "") => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
    }
    if (direction === "right") {
      setPage(page + 1);
    }

    refetch();
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              onPress={router.back}
            />
          ),
          headerTitle: "",
        }}
      />

      <FlatList
        data={isLoading ? [] : data}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{
          padding: SIZES.medium,
          rowGap: SIZES.medium,
        }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>

            {(isLoading || !!error) && (
              <View style={styles.loaderContainer}>
                {isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                  <Text>Oops something went wrong</Text>
                )}
              </View>
            )}
          </>
        )}
        ListFooterComponent={() =>
          !isLoading ? (
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination("left")}
                disabled={page <= 1}
              >
                <Image
                  source={icons.chevronLeft}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{page}</Text>
              </View>

              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination("right")}
              >
                <Image
                  source={icons.chevronRight}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default JobSearch;
