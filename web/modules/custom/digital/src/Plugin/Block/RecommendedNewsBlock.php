<?php

namespace Drupal\digital\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\image\Entity\ImageStyle;
use Drupal\node\Entity\Node;

/**
 * Provides a block for switching users.
 *
 * @Block(
 *   id = "random_recommended_news",
 *   admin_label = @Translation("Recommended News")
 * )
 */
class RecommendedNewsBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $database = \Drupal::database();
    $userquery = $database->select("node__field_tags", "nft");
    $userquery->addField("nft", "entity_id", "nid");
    $userquery->addField("nft", "field_tags_target_id", "tag_id");
    $tag_ids = $userquery->execute()->fetchAll(\PDO::FETCH_ASSOC);
    foreach ($tag_ids as $tag_id) {
      $tag_data[$tag_id['tag_id']][] = $tag_id['nid'];
      if (count($tag_data[$tag_id['tag_id']]) > 2) {
        $recommended_tag_nodes[] = $tag_data[$tag_id['tag_id']];
      }
      if (count($tag_data[$tag_id['tag_id']]) > 2) {
        $recommended_tag_nodes_next[] = $tag_data[$tag_id['tag_id']];
      }
    }
    if ($recommended_tag_nodes) {
      $random_keys = array_rand($recommended_tag_nodes, 1);
      $data_to_display = array_slice($recommended_tag_nodes[$random_keys], 0, 3);
    }
    else {
      $random_keys = array_rand($recommended_tag_nodes_next, 1);
      $data_to_display = $recommended_tag_nodes_next[$random_keys];
    }
    if ($data_to_display) {
      foreach ($data_to_display as $nid) {
        $node_load = Node::load($nid);
        if ($node_load) {
          $alias = \Drupal::service('path.alias_manager')
            ->getAliasByPath('/node/' . $node_load->id());
          $image_uri = $node_load->get("field_image")->entity->getFileUri();
          $image_style_url = ImageStyle::load("medium")->buildUrl($image_uri);
          $data[] = [
            'title' => $node_load->label(),
            'url' => $alias,
            'image' => $image_style_url,
          ];
        }
      }
    }
    $build = [
      '#markup' => $this->t("No news articles available."),
    ];
    if ($data) {
      $build = [
        '#theme' => "recommendednews",
        '#data' => $data,
      ];
    }
    return $build;
  }

}
